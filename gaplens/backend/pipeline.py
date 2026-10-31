import re
from typing import Dict, List, Any

def normalize_text(text: str) -> str:
    return re.sub(r"[^\w\s]", "", re.sub(r"[\s\r\n]+", " ", text).lower()).strip()

def verify_quote(source_content: str, quote: str) -> bool:
    if not quote or not source_content:
        return False
    if quote in source_content:
        return True
    norm_src = normalize_text(source_content)
    norm_q = normalize_text(quote)
    if norm_q in norm_src:
        return True
    q_nums = sorted(re.findall(r"\b\d+(?:\.\d+)?%?\b", quote))
    s_nums = sorted(re.findall(r"\b\d+(?:\.\d+)?%?\b", source_content))
    if not all(n in s_nums for n in q_nums):
        return False
    q_words = [w for w in norm_q.split() if len(w) > 2]
    matched = sum(1 for w in q_words if w in norm_src)
    return (matched / len(q_words)) >= 0.8 if q_words else False

def check_source_staleness(source: Dict[str, Any], current_year: int = 2026) -> Dict[str, Any]:
    cycle = source.get("cycle") or ""
    date_str = source.get("publish_date") or ""
    is_outdated = False
    warning = "Fresh source aligned with current operational cycle."
    
    if "2023" in cycle or "2024" in cycle or "Fall 2023" in cycle:
        is_outdated = True
        warning = f"References prior cycle ({cycle}). May not reflect 2025-2026 policies."
    elif date_str:
        year_match = re.search(r"20\d{2}", date_str)
        if year_match and int(year_match.group()) < current_year - 1:
            is_outdated = True
            warning = f"Published in {year_match.group()}, preceding recent guidelines."
    elif not cycle and not date_str:
        warning = "Undated documentation. Cannot establish temporal validity."

    return {
        "source_id": source["id"],
        "source_name": source["title"],
        "cycle": cycle,
        "date": date_str,
        "is_outdated": is_outdated,
        "message": warning
    }

def run_audit(areas: List[Dict[str, Any]], sources: List[Dict[str, Any]], facts: List[Dict[str, Any]], probes: List[Dict[str, Any]]) -> Dict[str, Any]:
    verified_facts = [f for f in facts if verify_quote(next((s["content"] for s in sources if s["id"] == f["source_id"]), ""), f.get("quote", ""))]
    source_map = {s["id"]: s for s in sources}
    area_map = {a["id"]: a for a in areas}
    
    has_official = any(s.get("source_type") in ("official", "handbook") for s in sources)
    auth_factor = 1.0 if has_official else 1.5

    staleness_list = [check_source_staleness(s) for s in sources]
    outdated_src_ids = {st["source_id"] for st in staleness_list if st["is_outdated"]}

    conflicts = []
    area_facts_map: Dict[str, List[Dict[str, Any]]] = {}
    for vf in verified_facts:
        area_facts_map.setdefault(vf["area_id"], []).append(vf)

    has_true_conflict = False

    for aid, f_list in area_facts_map.items():
        if len(f_list) > 1:
            for i in range(len(f_list)):
                for j in range(i + 1, len(f_list)):
                    f1, f2 = f_list[i], f_list[j]
                    if f1["source_id"] == f2["source_id"]:
                        continue
                    n1 = sorted(re.findall(r"\b\d+(?:\.\d+)?%?\b", f1["quote"]))
                    n2 = sorted(re.findall(r"\b\d+(?:\.\d+)?%?\b", f2["quote"]))
                    
                    is_conflict = (n1 and n2 and n1 != n2)
                    if is_conflict:
                        s1 = source_map.get(f1["source_id"], {})
                        s2 = source_map.get(f2["source_id"], {})
                        c1 = s1.get("cycle", "")
                        c2 = s2.get("cycle", "")
                        is_diff_cycle = c1 and c2 and c1 != c2

                        pref = s1["title"] if s1.get("authority_score", 0) >= s2.get("authority_score", 0) else s2["title"]
                        trust_note = f"Prioritize {pref} (Authority Score {max(s1.get('authority_score',0), s2.get('authority_score',0))}/10)."
                        
                        if is_diff_cycle:
                            trust_note += f" Discrepancy stems from different application cycles ({c1} vs {c2})."
                        else:
                            has_true_conflict = True

                        conflicts.append({
                            "id": f"conf-{f1['id']}-{f2['id']}",
                            "area_id": aid,
                            "area_name": area_map.get(aid, {}).get("name", aid),
                            "conflict_type": "different_time_period" if is_diff_cycle else "true_conflict",
                            "source_a": {"name": s1.get("title", ""), "quote": f1["quote"], "score": s1.get("authority_score", 0)},
                            "source_b": {"name": s2.get("title", ""), "quote": f2["quote"], "score": s2.get("authority_score", 0)},
                            "trust_suggestion": trust_note
                        })

    conflicted_area_ids = {c["area_id"] for c in conflicts if c.get("conflict_type") == "true_conflict"}

    matrix: Dict[str, Dict[str, str]] = {}
    covered_areas = set()
    for a in areas:
        aid = a["id"]
        matrix[aid] = {}
        for s in sources:
            sid = s["id"]
            has_fact = any(f["area_id"] == aid and f["source_id"] == sid for f in verified_facts)
            if aid in conflicted_area_ids and has_fact:
                matrix[aid][sid] = "conflict"
                covered_areas.add(aid)
            elif has_fact:
                matrix[aid][sid] = "outdated" if sid in outdated_src_ids else "covered"
                covered_areas.add(aid)
            else:
                matrix[aid][sid] = "not_found"

    dark_spots = [a for a in areas if a["id"] not in covered_areas]

    checklist = []
    for spot in dark_spots:
        priority = int(spot["importance"] * 3 * auth_factor)
        checklist.append({
            "id": f"chk-gap-{spot['id']}",
            "priority": priority,
            "category": "missing_gap",
            "title": f"Digital Dark Spot: {spot['name']}",
            "details": f"Zero coverage across all reviewed sources. Missing required information for {spot['name'].lower()}.",
            "recommended_action": "Request guidance from official scholarship administrative desk.",
            "draft_email": f"Subject: Inquiry regarding 2026 Application - {spot['name']}\nDear Admissions Committee,\nCould you please provide the verified requirements and official policies regarding {spot['name'].lower()}? Thank you."
        })

    for c in conflicts:
        area_imp = area_map.get(c["area_id"], {}).get("importance", 3)
        severity = 2 if c.get("conflict_type") == "true_conflict" else 1
        priority = int(area_imp * severity * auth_factor)
        checklist.append({
            "id": f"chk-{c['id']}",
            "priority": priority,
            "category": "conflict",
            "title": f"Verify Claim: {c['area_name']} ({c.get('conflict_type').replace('_', ' ').title()})",
            "details": f"Discrepancy detected between {c['source_a']['name']} and {c['source_b']['name']}.",
            "recommended_action": c["trust_suggestion"],
            "draft_email": f"Subject: Clarification on {c['area_name']} Discrepancy\nDear Program Coordinator,\nI observed differing figures published regarding {c['area_name']}. Which directive is binding for 2026 applicants?"
        })

    for st in staleness_list:
        if st["is_outdated"]:
            checklist.append({
                "id": f"chk-stale-{st['source_id']}",
                "priority": int(3 * 2 * auth_factor),
                "category": "staleness",
                "title": f"Verify Stale Material: {st['source_name']}",
                "details": st["message"],
                "recommended_action": "Check for 2026 updated circular or amendment notices.",
                "draft_email": f"Subject: Validity of {st['source_name']} for 2026\nDear Support,\nDoes the guidance in {st['source_name']} remain operative for the active application cycle?"
            })

    for p in probes:
        if p["status"] == "unanswered":
            checklist.append({
                "id": f"chk-probe-{p['id']}",
                "priority": int(2 * 1 * auth_factor),
                "category": "open_question",
                "title": f"Unanswered Query: {p['question']}",
                "details": "Operational inquiry unaddressed in existing files.",
                "recommended_action": "Submit query ticket to helpline.",
                "draft_email": f"Subject: Question regarding: {p['question']}\nDear Team,\nCould you please clarify: {p['question']}?"
            })

    checklist.sort(key=lambda x: x["priority"], reverse=True)

    has_critical_gap = any(a["importance"] >= 4 for a in dark_spots)
    if has_critical_gap or has_true_conflict:
        verdict = "not_ready"
        verdict_text = "Not Ready to Decide: Critical dark spots or active contradictions exist in the sources."
    elif any(s["category"] == "missing_gap" for s in checklist) or not has_official:
        verdict = "verify_first"
        verdict_text = "Verify Before Deciding: Secondary sources or moderate gaps require confirmation."
    else:
        verdict = "no_critical_gaps"
        verdict_text = "No Critical Gaps Found: All major areas covered and verified with 2026 official handbook citations."

    return {
        "verdict": verdict,
        "verdict_reason": verdict_text,
        "areas": areas,
        "sources": sources,
        "matrix": matrix,
        "conflicts": conflicts,
        "staleness": staleness_list,
        "checklist": checklist,
        "probes": probes,
        "facts": verified_facts,
        "stats": {
            "total_sources": len(sources),
            "total_areas": len(areas),
            "covered_count": len(covered_areas),
            "dark_spots_count": len(dark_spots),
            "conflicts_count": len(conflicts),
            "stale_count": sum(1 for s in staleness_list if s["is_outdated"]),
            "coverage_pct": round((len(covered_areas) / len(areas) * 100)) if areas else 0
        }
    }
