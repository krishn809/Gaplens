import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from gaplens.db.database import db
from gaplens.backend.pipeline import run_audit

app = FastAPI(title="GapLens API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = "demo123"

class SourceRequest(BaseModel):
    title: str
    content: str
    url: Optional[str] = ""
    source_type: Optional[str] = "web"
    cycle: Optional[str] = "2025-2026"

class AdvisorRequest(BaseModel):
    message: str
    topic: Optional[str] = "Scholarships & Grants"
    api_key: Optional[str] = None
    provider: Optional[str] = "gemini"

@app.post("/api/auth/login")
def login(req: LoginRequest):
    user = db.users.get(req.email.lower().strip())
    if not user:
        if "krishn" in req.email.lower() or "demo" in req.email.lower():
            user = db.users["krishn@gaplens.ai"]
        else:
            user = {
                "name": req.email.split("@")[0].title() or "Krishn Kushwaha",
                "role": "Lead Full-Stack AI Engineer",
                "team": "AI Systems Lab",
                "avatar": "KK"
            }
    db.current_user = user
    return {"status": "success", "user": user}

@app.get("/api/auth/me")
def get_me():
    return {"user": db.current_user or db.users["krishn@gaplens.ai"]}

@app.get("/api/audit/current")
def get_current_audit():
    return run_audit(db.expected_areas, db.sources, db.facts, db.probes)

@app.post("/api/audit/run")
def trigger_audit():
    result = run_audit(db.expected_areas, db.sources, db.facts, db.probes)
    return {"status": "success", "data": result}

@app.post("/api/audit/add-handbook")
def add_handbook_diff():
    handbook_id = "src-handbook"
    if not any(s["id"] == handbook_id for s in db.sources):
        db.sources.append({
            "id": handbook_id,
            "title": "Official 2026 Policy Handbook (Authority 10/10)",
            "url": "https://scholarship.university.edu/docs/handbook-2026.pdf",
            "source_type": "handbook",
            "publish_date": "2026-02-01",
            "cycle": "2025-2026",
            "authority_score": 10.0,
            "content": "Official Directive: Fellowship renewal requires maintaining a minimum 3.0 CGPA each academic year and verified 80% lecture attendance. The household income threshold is strictly $45,000 backed by certified tax assessment forms."
        })
        db.facts.append({
            "id": "f8-renewal",
            "source_id": handbook_id,
            "area_id": "area-renewal",
            "quote": "Fellowship renewal requires maintaining a minimum 3.0 CGPA each academic year and verified 80% lecture attendance",
            "verified": True
        })
        db.facts.append({
            "id": "f9-income-resolve",
            "source_id": handbook_id,
            "area_id": "area-income",
            "quote": "household income threshold is strictly $45,000 backed by certified tax assessment forms",
            "verified": True
        })
        for p in db.probes:
            if p["id"] == "p1":
                p["status"] = "answered"
                p["answer"] = "Official 2026 Policy Handbook establishes minimum 3.0 CGPA each academic year and verified 80% lecture attendance."
    return run_audit(db.expected_areas, db.sources, db.facts, db.probes)

@app.post("/api/audit/reset")
def reset_audit():
    db.reset_to_default_scholarship()
    return run_audit(db.expected_areas, db.sources, db.facts, db.probes)

@app.post("/api/audit/add-source")
def add_custom_source(req: SourceRequest):
    new_id = f"src-{len(db.sources) + 1}"
    db.sources.append({
        "id": new_id,
        "title": req.title,
        "url": req.url,
        "source_type": req.source_type,
        "publish_date": "2026-02-15",
        "cycle": req.cycle,
        "authority_score": 7.0,
        "content": req.content
    })
    return run_audit(db.expected_areas, db.sources, db.facts, db.probes)

@app.post("/api/ai/advisor")
def get_ai_advice(req: AdvisorRequest):
    api_key = req.api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or os.environ.get("OPENAI_API_KEY")
    provider = req.provider or "gemini"
    
    current_audit = run_audit(db.expected_areas, db.sources, db.facts, db.probes)
    dark_spots = [a["name"] for a in current_audit["areas"] if (current_audit["matrix"].get(a["id"]) and all(v == "not_found" for v in current_audit["matrix"][a["id"]].values()))]
    conflicts = [f"{c['area_name']}: {c['source_a']['name']} vs {c['source_b']['name']}" for c in current_audit.get("conflicts", [])]

    if api_key and provider == "gemini":
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            prompt = f"System: You are GapLens AI Advisor, an expert information gap intelligence auditor.\nCurrent Audit Status:\n- Dark Spots (Omitted clauses): {', '.join(dark_spots) if dark_spots else 'None'}\n- Conflicts: {', '.join(conflicts) if conflicts else 'None'}\n- Decision Verdict: {current_audit['verdict']}\nUser Question: {req.message}\nProvide a concise, direct, high-value tactical recommendation."
            resp = model.generate_content(prompt)
            return {"status": "success", "response": resp.text, "provider": "Google Gemini (Live API)"}
        except Exception:
            pass

    if api_key and provider == "openai":
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            prompt = f"Current Audit Status: Dark Spots: {dark_spots}. Conflicts: {conflicts}. Verdict: {current_audit['verdict']}."
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are GapLens AI Advisor, an expert information gap intelligence auditor. Be concise and authoritative."},
                    {"role": "user", "content": f"{prompt}\nUser Question: {req.message}"}
                ],
                max_tokens=250
            )
            return {"status": "success", "response": completion.choices[0].message.content, "provider": "OpenAI GPT-4o (Live API)"}
        except Exception:
            pass

    msg_lower = req.message.lower()
    if "dark spot" in msg_lower or "missing" in msg_lower or "risk" in msg_lower:
        if dark_spots:
            text = f"🚨 **Critical Dark Spot Alert:** The clause **{dark_spots[0]}** (Importance 5/5) is completely absent across all 3 reviewed sources. Making a submission without verifying renewal CGPA and attendance retention rates poses immediate funding forfeiture risk. Ingest the official 2026 Policy Handbook to verify."
        else:
            text = "✨ **Zero Critical Dark Spots:** All 6 required areas have verified verbatim coverage anchored to source text. Your primary focus should now be document verification."
    elif "conflict" in msg_lower or "income" in msg_lower or "discrepancy" in msg_lower:
        text = "⚖️ **Source Discrepancy Analysis:** The Official University Portal mandates parental income certificate below **$45,000**, while the Student Discussion Forum claims a **$60,000** limit. The forum references the older **Fall 2023** cycle (Authority 4.0/10). Always prioritize the Official Portal (Authority 9.5/10) as binding."
    elif "draft" in msg_lower or "email" in msg_lower or "contact" in msg_lower:
        text = "📧 **Official Inquiry Advisory:** Use this draft for the administrative office:\n\n*Subject: Inquiry regarding 2026 Application Requirements*\n*Dear Admissions Committee, I am finalizing my application. Could you please confirm the exact renewal grade retention threshold and whether parental tax certifications below $45,000 are the sole binding standard? Thank you.*"
    else:
        text = f"🧠 **AI Advisor Synthesis:** Current Decision Readiness is **{current_audit['verdict'].replace('_', ' ').upper()}**. You have {len(current_audit.get('facts', []))} verified quotes anchored in code with zero numerical drift. Ingesting the 2026 Policy Handbook will close your remaining dark spot and resolve cycle conflicts."

    return {
        "status": "success",
        "response": text,
        "provider": "GapLens AI Engine (Gemini / OpenAI Ready)",
        "suggestions": [
            "What is my highest-risk dark spot?",
            "How do I resolve the income discrepancy?",
            "Draft a formal verification notice to the board"
        ]
    }

frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
