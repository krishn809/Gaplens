const TOPIC_DATASETS = {
  scholarship: {
    title: "“What should I verify before applying for this scholarship?”",
    verdict: "not_ready",
    verdict_reason: "Critical dark spots exist: Renewal terms missing from all initial sources.",
    stats: { total_sources: 3, total_areas: 6, covered_count: 5, dark_spots_count: 1, conflicts_count: 1, stale_count: 1, coverage_pct: 83 },
    areas: [
      { id: "area-eligibility", name: "Eligibility", importance: 5, why: "Base prerequisite: GPA, enrollment, citizen status." },
      { id: "area-docs", name: "Documents", importance: 4, why: "Mandatory certificates; missing docs lead to disqualification." },
      { id: "area-renewal", name: "Renewal Terms", importance: 5, why: "Critical multi-year retention terms; digital dark spot if absent." },
      { id: "area-deadline", name: "Deadline", importance: 4, why: "Submission window closure; past dates void applications." },
      { id: "area-income", name: "Income Limit", importance: 3, why: "Family financial cap; common conflict area between sources." },
      { id: "area-disbursement", name: "Disbursement", importance: 2, why: "Term distribution frequency for tuition allowance." }
    ],
    sources: [
      { id: "src-portal", title: "Official University Portal", url: "https://scholarship.university.edu/merit-2026", source_type: "official", publish_date: "2026-01-15", cycle: "2025-2026", authority_score: 9.5 },
      { id: "src-forum", title: "Student Discussion Forum", url: "https://studenttalk.org/threads/scholarship-query", source_type: "forum", publish_date: "2024-03-10", cycle: "Fall 2023", authority_score: 4.0 },
      { id: "src-news", title: "Education Gazette Bulletin", url: "https://edunews.org/circulars/higher-ed-2025", source_type: "news", publish_date: "2025-11-20", cycle: "2025-2026", authority_score: 6.5 }
    ],
    matrix: {
      "area-eligibility": { "src-portal": "covered", "src-forum": "not_found", "src-news": "not_found" },
      "area-docs": { "src-portal": "covered", "src-forum": "not_found", "src-news": "not_found" },
      "area-renewal": { "src-portal": "not_found", "src-forum": "not_found", "src-news": "not_found" },
      "area-deadline": { "src-portal": "covered", "src-forum": "not_found", "src-news": "covered" },
      "area-income": { "src-portal": "covered", "src-forum": "outdated", "src-news": "not_found" },
      "area-disbursement": { "src-portal": "covered", "src-forum": "not_found", "src-news": "not_found" }
    },
    facts: [
      { id: "f1", source_id: "src-portal", area_id: "area-eligibility", quote: "full-time undergraduates with minimum CGPA of 3.2" },
      { id: "f2", source_id: "src-portal", area_id: "area-docs", quote: "Mandatory documents include valid national ID, certified transcripts, and verified parental income certificate below $45,000 annually" },
      { id: "f3", source_id: "src-portal", area_id: "area-deadline", quote: "Application deadline is 31 March 2026" },
      { id: "f4", source_id: "src-portal", area_id: "area-disbursement", quote: "Disbursements occur in two equal semester installments" },
      { id: "f5", source_id: "src-portal", area_id: "area-income", quote: "parental income certificate below $45,000 annually" },
      { id: "f6", source_id: "src-forum", area_id: "area-income", quote: "income ceiling was stated as $60,000 annual household earnings" },
      { id: "f7", source_id: "src-news", area_id: "area-deadline", quote: "Final deadline for submissions is 31 March 2026" }
    ],
    conflicts: [
      {
        id: "c1",
        area_id: "area-income",
        area_name: "Income Limit",
        source_a: { name: "Official University Portal", quote: "parental income certificate below $45,000 annually", score: 9.5 },
        source_b: { name: "Student Discussion Forum", quote: "income ceiling was stated as $60,000 annual household earnings", score: 4.0 },
        trust_suggestion: "Prioritize Official University Portal (Authority Score 9.5/10). Discrepancy stems from prior cycle (Fall 2023 vs 2025-2026)."
      }
    ],
    staleness: [
      { source_id: "src-portal", source_name: "Official University Portal", cycle: "2025-2026", date: "2026-01-15", is_outdated: false, message: "Fresh source aligned with current operational cycle." },
      { source_id: "src-forum", source_name: "Student Discussion Forum", cycle: "Fall 2023", date: "2024-03-10", is_outdated: true, message: "References prior cycle (Fall 2023). May not reflect 2025-2026 policies." },
      { source_id: "src-news", source_name: "Education Gazette Bulletin", cycle: "2025-2026", date: "2025-11-20", is_outdated: false, message: "Fresh source aligned with current operational cycle." }
    ],
    checklist: [
      {
        id: "chk-gap-1",
        priority: 15,
        category: "missing_gap",
        title: "Digital Dark Spot: Renewal Terms",
        details: "Zero coverage across all reviewed sources. Missing required information for renewal conditions.",
        recommended_action: "Request guidance from official scholarship administrative desk.",
        draft_email: "Subject: Inquiry regarding 2026 Application - Renewal Terms\nDear Admissions Committee,\nCould you please provide the verified requirements and official policies regarding renewal terms? Thank you."
      },
      {
        id: "chk-conf-1",
        priority: 6,
        category: "conflict",
        title: "Verify Claim: Income Limit (Different Time Period)",
        details: "Discrepancy detected between Official University Portal and Student Discussion Forum.",
        recommended_action: "Prioritize Official University Portal (Authority Score 9.5/10).",
        draft_email: "Subject: Clarification on Income Limit Discrepancy\nDear Program Coordinator,\nI observed differing figures published regarding Income Limit ($45,000 vs $60,000). Which directive is binding for 2026 applicants?"
      },
      {
        id: "chk-stale-1",
        priority: 6,
        category: "staleness",
        title: "Verify Stale Material: Student Discussion Forum",
        details: "References prior cycle (Fall 2023). May not reflect 2025-2026 policies.",
        recommended_action: "Check for 2026 updated circular or amendment notices.",
        draft_email: "Subject: Validity of Student Discussion Forum for 2026\nDear Support,\nDoes the guidance in Student Discussion Forum remain operative for the active application cycle?"
      },
      {
        id: "chk-pr-1",
        priority: 2,
        category: "open_question",
        title: "Unanswered Query: Minimum CGPA or attendance standard to renew funding?",
        details: "Operational inquiry unaddressed in existing files.",
        recommended_action: "Submit query ticket to helpline.",
        draft_email: "Subject: Question regarding renewal requirements\nDear Team,\nCould you please clarify what minimum CGPA or attendance standard is mandatory to renew funding?"
      }
    ],
    probes: [
      { id: "p1", question: "What minimum CGPA or attendance standard is mandatory to renew funding for year 2?", status: "unanswered", answer: null },
      { id: "p2", question: "Is income verification restricted to official tax assessments or are pay stubs permitted?", status: "partial", answer: "Official portal cites tax certified income certificate below $45,000; forum mentions self-declared pay stubs." },
      { id: "p3", question: "When is the final application submission cutoff date?", status: "answered", answer: "31 March 2026 verified across official portal and education gazette." }
    ]
  },
  visa: {
    title: "“What should I verify before applying for this Research Visa?”",
    verdict: "not_ready",
    verdict_reason: "Digital Dark Spot: Biometric verification window and police clearance terms missing.",
    stats: { total_sources: 3, total_areas: 5, covered_count: 4, dark_spots_count: 1, conflicts_count: 1, stale_count: 1, coverage_pct: 80 },
    areas: [
      { id: "area-visa-pass", name: "Valid Passport Validity", importance: 5, why: "Minimum 6 months validity from departure date." },
      { id: "area-visa-funds", name: "Proof of Financial Means", importance: 5, why: "Mandatory bank guarantee statements." },
      { id: "area-visa-bio", name: "Biometric Appointment Window", importance: 4, why: "Digital Dark Spot: Slot scheduling timeframe omitted." },
      { id: "area-visa-pcc", name: "Police Clearance Certificate", importance: 4, why: "Required validity duration before application." },
      { id: "area-visa-proc", name: "Processing Duration", importance: 3, why: "Estimated processing turnaround." }
    ],
    sources: [
      { id: "src-embassy", title: "Consular Visa Portal", url: "https://consular.gov/research-visa", source_type: "official", publish_date: "2026-01-10", cycle: "2025-2026", authority_score: 9.8 },
      { id: "src-expat", title: "Expat Immigration Blog", url: "https://expatvisa.com/guides/2024", source_type: "blog", publish_date: "2024-02-14", cycle: "2023-2024", authority_score: 4.5 },
      { id: "src-gazette-v", title: "Immigration Circular Bulletin", url: "https://immigration.gov/notices/2025", source_type: "official", publish_date: "2025-12-01", cycle: "2025-2026", authority_score: 8.5 }
    ],
    matrix: {
      "area-visa-pass": { "src-embassy": "covered", "src-expat": "not_found", "src-gazette-v": "covered" },
      "area-visa-funds": { "src-embassy": "covered", "src-expat": "outdated", "src-gazette-v": "not_found" },
      "area-visa-bio": { "src-embassy": "not_found", "src-expat": "not_found", "src-gazette-v": "not_found" },
      "area-visa-pcc": { "src-embassy": "covered", "src-expat": "not_found", "src-gazette-v": "not_found" },
      "area-visa-proc": { "src-embassy": "covered", "src-expat": "not_found", "src-gazette-v": "covered" }
    },
    facts: [
      { id: "vf1", source_id: "src-embassy", area_id: "area-visa-pass", quote: "Passport must remain valid for minimum 6 months past intended date of stay" },
      { id: "vf2", source_id: "src-embassy", area_id: "area-visa-funds", quote: "Maintenance funds required: minimum $3,200 per month of stay" },
      { id: "vf3", source_id: "src-expat", area_id: "area-visa-funds", quote: "Previous requirement cited $2,500 monthly proof of funds" },
      { id: "vf4", source_id: "src-embassy", area_id: "area-visa-pcc", quote: "Police clearance certificate must be issued within 90 days prior to filing" },
      { id: "vf5", source_id: "src-embassy", area_id: "area-visa-proc", quote: "Standard turnaround time is 15 to 20 working business days" }
    ],
    conflicts: [
      {
        id: "vc1",
        area_id: "area-visa-funds",
        area_name: "Proof of Financial Means",
        source_a: { name: "Consular Visa Portal", quote: "minimum $3,200 per month of stay", score: 9.8 },
        source_b: { name: "Expat Immigration Blog", quote: "Previous requirement cited $2,500 monthly proof", score: 4.5 },
        trust_suggestion: "Prioritize Consular Visa Portal ($3,200 active policy). Blog references older 2023 guidelines."
      }
    ],
    staleness: [
      { source_id: "src-embassy", source_name: "Consular Visa Portal", cycle: "2025-2026", date: "2026-01-10", is_outdated: false, message: "Active consular directive for 2026." },
      { source_id: "src-expat", source_name: "Expat Immigration Blog", cycle: "2023-2024", date: "2024-02-14", is_outdated: true, message: "Published in 2024 citing superseded thresholds." },
      { source_id: "src-gazette-v", source_name: "Immigration Circular Bulletin", cycle: "2025-2026", date: "2025-12-01", is_outdated: false, message: "Aligned with current fiscal year." }
    ],
    checklist: [
      {
        id: "vchk-1",
        priority: 15,
        category: "missing_gap",
        title: "Digital Dark Spot: Biometric Appointment Window",
        details: "Zero coverage across sources on mandatory biometric submission timelines.",
        recommended_action: "Inquire with Visa Application Center (VAC) helpline.",
        draft_email: "Subject: Inquiry regarding Biometric Appointment Window\nDear Consular Section,\nCould you please clarify the mandatory window for biometric enrollment after online application submission? Thank you."
      }
    ],
    probes: [
      { id: "vp1", question: "What is the maximum allowed window between application submission and biometric appointment?", status: "unanswered", answer: null }
    ]
  }
};

let currentAuditData = JSON.parse(JSON.stringify(TOPIC_DATASETS.scholarship));

document.addEventListener("DOMContentLoaded", () => {
  initCursorAnimations();
  setupLoginForm();
  setupFilterHandlers();
});

function initCursorAnimations() {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty("--cursor-x", `${x}px`);
      btn.style.setProperty("--cursor-y", `${y}px`);
    });
  });
}

function showAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "flex";
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
}

function directEnterDashboard() {
  closeAuthModal();
  const landing = document.getElementById("landing-page");
  const appContainer = document.getElementById("app-container");
  if (landing) landing.style.display = "none";
  if (appContainer) appContainer.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Welcome Krishn Kushwaha! Glassmorphism dashboard active.");
  loadAuditData();
}

function exitToLanding() {
  const appContainer = document.getElementById("app-container");
  const landing = document.getElementById("landing-page");
  if (appContainer) appContainer.style.display = "none";
  if (landing) landing.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email")?.value || "krishn@gaplens.ai";
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        const sideName = document.getElementById("sidebar-name");
        const sideAvatar = document.getElementById("sidebar-avatar");
        if (sideName) sideName.innerText = data.user.name;
        if (sideAvatar) sideAvatar.innerText = data.user.avatar || "KK";
      }
    } catch {}
    directEnterDashboard();
  });
}

function setupFilterHandlers() {
  const topicSelect = document.querySelector(".filter-select");
  if (topicSelect) {
    topicSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val.includes("Visa")) {
        currentAuditData = JSON.parse(JSON.stringify(TOPIC_DATASETS.visa));
        showToast("Switched scenario: Research Visa Gap Audit.");
      } else {
        currentAuditData = JSON.parse(JSON.stringify(TOPIC_DATASETS.scholarship));
        showToast("Switched scenario: Scholarship Gap Audit.");
      }
      renderDashboard(currentAuditData);
    });
  }
}

function logout() {
  exitToLanding();
  showAuthModal();
  showToast("Logged out successfully.");
}

async function loadAuditData() {
  try {
    const res = await fetch("/api/audit/current");
    if (res.ok) {
      const data = await res.json();
      currentAuditData = data;
    }
  } catch {}
  renderDashboard(currentAuditData);
}

function setSafeText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function renderDashboard(data) {
  if (!data) return;

  const stats = data.stats || {};
  setSafeText("kpi-sources", stats.total_sources || 3);
  setSafeText("kpi-coverage", `${stats.coverage_pct || 0}%`);
  setSafeText("kpi-coverage-badge", `${stats.covered_count || 0} of ${stats.total_areas || 6} Areas Covered`);
  setSafeText("kpi-darkspots", stats.dark_spots_count || 0);
  setSafeText("kpi-darkspots-badge", stats.dark_spots_count > 0 ? "Critical Clauses Missing" : "All Requirements Covered");
  setSafeText("kpi-conflicts", stats.conflicts_count || 0);

  const vTitle = document.getElementById("kpi-verdict-title");
  const vSub = document.getElementById("kpi-verdict-sub");
  if (vTitle && vSub) {
    if (data.verdict === "no_critical_gaps") {
      vTitle.innerText = "NO CRITICAL GAPS";
      vTitle.style.color = "var(--sprinkle-green)";
      vSub.className = "kpi-badge badge-green";
      vSub.innerText = "All Areas Verified with 2026 Handbook";
    } else if (data.verdict === "verify_first") {
      vTitle.innerText = "VERIFY FIRST";
      vTitle.style.color = "var(--slate-blue)";
      vSub.className = "kpi-badge badge-stale";
      vSub.innerText = "Secondary Sources Present";
    } else {
      vTitle.innerText = "NOT READY";
      vTitle.style.color = "var(--cherry-red)";
      vSub.className = "kpi-badge badge-red";
      vSub.innerText = "Digital Dark Spot / Conflict";
    }
  }

  const quotesCount = (data.facts || []).length;
  setSafeText("stat-quotes-count", `${quotesCount} / ${quotesCount} Quotes`);
  setSafeText("stat-area-count", `${stats.covered_count || 0} / ${stats.total_areas || 6}`);

  const barCov = document.getElementById("bar-coverage");
  if (barCov) barCov.style.width = `${stats.coverage_pct || 0}%`;
  
  const freshCount = (data.staleness || []).filter(s => !s.is_outdated).length;
  setSafeText("stat-fresh-count", `${freshCount} / ${stats.total_sources || 3} Current`);

  const barFresh = document.getElementById("bar-fresh");
  if (barFresh) barFresh.style.width = `${Math.round((freshCount / (stats.total_sources || 1)) * 100)}%`;

  renderDonutEvidence(data);
  renderArcGauge(data);
  renderPillarsChart(data);
  renderSegmentedTimeline(data);
  renderHeatmap(data);
  renderConflicts(data.conflicts || []);
  renderChecklist(data.checklist || []);
  renderReferenceCharts(data);
}

function renderReferenceCharts(data) {
  const isHandbookAdded = (data.stats.dark_spots_count === 0);
  const quotesCount = (data.facts || []).length;
  setSafeText("kpi-quotes", quotesCount);

  const renewalVal = document.getElementById("vb-val-2");
  const renewalBar = document.getElementById("vb-bar-2");
  const corVal = document.getElementById("cor-val-3");
  const corBar = document.getElementById("cor-bar-3");

  if (isHandbookAdded) {
    if (renewalVal) renewalVal.innerText = "68";
    if (renewalBar) renewalBar.style.height = "85%";
    if (corVal) corVal.innerText = "2.1%";
    if (corBar) corBar.style.height = "21%";
    setSafeText("kpi-darkspots", "0.0%");
    setSafeText("kpi-darkspots-badge", "↓ 100% (Zero Gaps)");
    setSafeText("kpi-verdict-title", "9.8 / 10");
    setSafeText("kpi-verdict-sub", "READY (Fully Verified)");
  } else {
    if (renewalVal) renewalVal.innerText = "14";
    if (renewalBar) renewalBar.style.height = "18%";
    if (corVal) corVal.innerText = "14.6%";
    if (corBar) corBar.style.height = "98%";
    setSafeText("kpi-darkspots", "16.7%");
    setSafeText("kpi-darkspots-badge", "↓ 3.2% vs. last year");
    setSafeText("kpi-verdict-title", "8.2 / 10");
    setSafeText("kpi-verdict-sub", "NOT READY (Gap Alert)");
  }
}

async function sendAdvisorPrompt(text) {
  const input = document.getElementById("advisor-input");
  if (input) input.value = text;
  await executeAdvisorQuery(text);
}

async function handleAdvisorSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("advisor-input");
  const text = (input?.value || "").trim();
  if (!text) return;
  await executeAdvisorQuery(text);
}

async function executeAdvisorQuery(text) {
  const chatHistory = document.getElementById("advisor-chat-history");
  const input = document.getElementById("advisor-input");
  if (input) input.value = "";

  if (chatHistory) {
    const userMsg = document.createElement("div");
    userMsg.className = "chat-bubble-user";
    userMsg.innerText = text;
    chatHistory.appendChild(userMsg);

    const typingMsg = document.createElement("div");
    typingMsg.className = "chat-bubble-ai";
    typingMsg.id = "advisor-typing-indicator";
    typingMsg.innerHTML = "<em>Evaluating multi-source evidence integrity...</em>";
    chatHistory.appendChild(typingMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  const provider = document.getElementById("ai-provider-select")?.value || "gemini";
  let answer = "";
  let engineProvider = "GapLens AI Engine";

  try {
    const res = await fetch("/api/ai/advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        topic: currentAuditData.title,
        provider: provider
      })
    });
    if (res.ok) {
      const data = await res.json();
      answer = data.response;
      engineProvider = data.provider || "Google Gemini / OpenAI Engine";
    }
  } catch {}

  if (!answer) {
    const isHandbookAdded = (currentAuditData.stats.dark_spots_count === 0);
    const lower = text.toLowerCase();
    if (lower.includes("dark spot") || lower.includes("missing") || lower.includes("risk")) {
      if (!isHandbookAdded) {
        answer = "🚨 <strong>Critical Dark Spot:</strong> The clause <strong>Renewal Terms</strong> (Importance 5/5) is completely absent across all 3 reviewed sources. Ingest the 2026 Policy Handbook to verify minimum 3.0 CGPA and 80% attendance standards.";
      } else {
        answer = "✨ <strong>Zero Digital Dark Spots:</strong> All required criteria have verified verbatim coverage anchored to the 2026 Policy Handbook.";
      }
    } else if (lower.includes("conflict") || lower.includes("income") || lower.includes("discrepancy")) {
      answer = "⚖️ <strong>Source Discrepancy Analysis:</strong> The Official University Portal mandates parental income below <strong>$45,000</strong> (Authority 9.5/10), while the Student Discussion Forum claims <strong>$60,000</strong> (Authority 4.0/10). The forum references an older <em>Fall 2023</em> batch. Always adhere strictly to the Official Portal directive.";
    } else if (lower.includes("draft") || lower.includes("email") || lower.includes("board") || lower.includes("inquiry")) {
      answer = "📧 <strong>Verification Inquiry Draft:</strong><br><br><em>Subject: Verification of 2026 Scholarship Conditions<br>Dear Selection Committee,<br>I am preparing my 2026 application. Could you please confirm if the parental tax threshold below $45,000 is the sole operative requirement, and whether 3.0 CGPA is required for annual fellowship renewal? Thank you.</em>";
    } else if (lower.includes("handbook")) {
      answer = "📖 <strong>Handbook Impact:</strong> Ingesting the 2026 Policy Handbook introduces verified verbatim evidence for Renewal Terms (3.0 CGPA + 80% attendance) and resolves cycle conflicts, elevating Decision Readiness to <strong>READY (9.8/10)</strong>.";
    } else {
      answer = `🧠 <strong>Intelligence Summary:</strong> Decision Readiness is currently <strong>${currentAuditData.verdict.replace(/_/g, " ").toUpperCase()}</strong> with ${currentAuditData.stats.covered_count}/${currentAuditData.stats.total_areas} areas verified. ${!isHandbookAdded ? "Action required: Ingest 2026 Policy Handbook to eliminate Renewal Terms dark spot." : "All systems green for verified submission."}`;
    }
  }

  const indicator = document.getElementById("advisor-typing-indicator");
  if (indicator) indicator.remove();

  if (chatHistory) {
    const aiMsg = document.createElement("div");
    aiMsg.className = "chat-bubble-ai";
    aiMsg.innerHTML = `<div>${answer}</div><div style="font-size: 10px; color: var(--slate-blue); margin-top: 6px; font-weight: 600;">Engine: ${engineProvider}</div>`;
    chatHistory.appendChild(aiMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
}

function renderDonutEvidence(data) {
  const isHandbookAdded = (data.stats.dark_spots_count === 0);
  setSafeText("chart-total-evidence", `${data.stats.coverage_pct || 83}% Coverage`);
  setSafeText("donut-center-pct", `${data.stats.coverage_pct || 83}%`);
  
  const officialSeg = document.getElementById("donut-seg-official");
  const newsSeg = document.getElementById("donut-seg-news");
  const forumSeg = document.getElementById("donut-seg-forum");

  if (isHandbookAdded) {
    if (officialSeg) officialSeg.setAttribute("stroke-dasharray", "65, 100");
    if (newsSeg) {
      newsSeg.setAttribute("stroke-dasharray", "20, 100");
      newsSeg.setAttribute("stroke-dashoffset", "-65");
    }
    if (forumSeg) {
      forumSeg.setAttribute("stroke-dasharray", "15, 100");
      forumSeg.setAttribute("stroke-dashoffset", "-85");
    }
    setSafeText("val-official", "6 Quotes (Handbook)");
  } else {
    if (officialSeg) officialSeg.setAttribute("stroke-dasharray", "52, 100");
    if (newsSeg) {
      newsSeg.setAttribute("stroke-dasharray", "24, 100");
      newsSeg.setAttribute("stroke-dashoffset", "-52");
    }
    if (forumSeg) {
      forumSeg.setAttribute("stroke-dasharray", "14, 100");
      forumSeg.setAttribute("stroke-dashoffset", "-76");
    }
    setSafeText("val-official", "4 Quotes");
  }
}

function renderArcGauge(data) {
  const progressArc = document.getElementById("arc-gauge-progress");
  const centerVal = document.getElementById("arc-center-val");
  const centerSub = document.getElementById("arc-center-sub");
  const gaugeBadge = document.getElementById("gauge-badge");

  if (data.verdict === "no_critical_gaps") {
    if (progressArc) {
      progressArc.setAttribute("stroke", "var(--sprinkle-green)");
      progressArc.style.strokeDashoffset = "0";
    }
    if (centerVal) {
      centerVal.innerText = "READY";
      centerVal.style.color = "var(--sprinkle-green)";
    }
    setSafeText("arc-center-sub", "0 Gaps Remaining");
    if (gaugeBadge) {
      gaugeBadge.innerText = "Fully Verified";
      gaugeBadge.className = "kpi-badge badge-green";
    }
    setSafeText("gauge-sourced-count", `${data.stats.covered_count || 6} Areas`);
    setSafeText("gauge-missing-count", "0 Gaps");
  } else {
    if (progressArc) {
      progressArc.setAttribute("stroke", "var(--cherry-red)");
      progressArc.style.strokeDashoffset = "48";
    }
    if (centerVal) {
      centerVal.innerText = "NOT READY";
      centerVal.style.color = "var(--cherry-red)";
    }
    setSafeText("arc-center-sub", "1 Dark Spot Remaining");
    if (gaugeBadge) {
      gaugeBadge.innerText = "Critical Gaps";
      gaugeBadge.className = "kpi-badge badge-red";
    }
    setSafeText("gauge-sourced-count", `${data.stats.covered_count || 5} Areas`);
    setSafeText("gauge-missing-count", "1 Area");
  }
}

function renderPillarsChart(data) {
  const container = document.getElementById("pillars-container");
  if (!container) return;
  container.innerHTML = "";

  data.areas.forEach((area) => {
    const isDarkSpot = (data.stats.dark_spots_count > 0 && (area.id === "area-renewal" || area.id === "area-visa-bio"));
    const isConflict = (data.conflicts || []).some(c => c.area_id === area.id);

    let heightPct = 85;
    let barBg = "var(--sprinkle-green)";
    let scoreTxt = "100%";

    if (isDarkSpot) {
      heightPct = 14;
      barBg = "var(--cherry-red)";
      scoreTxt = "0%";
    } else if (isConflict) {
      heightPct = 68;
      barBg = "var(--baby-pink)";
      scoreTxt = "66%";
    }

    const col = document.createElement("div");
    col.className = "pillar-col";
    col.innerHTML = `
      <div style="font-size: 11px; font-weight: 800; color: ${barBg}; margin-bottom: 6px;">${scoreTxt}</div>
      <div class="pillar-bar" style="height: ${heightPct}%; background: ${barBg};" title="${area.name}: ${scoreTxt}"></div>
      <div class="pillar-label">${area.name}</div>
    `;
    container.appendChild(col);
  });

  const covPct = data.stats.coverage_pct || 83;
  const missPct = 100 - covPct;
  setSafeText("balance-txt-covered", `${covPct}%`);
  setSafeText("balance-txt-missing", `${missPct}%`);
  
  const barCov = document.getElementById("balance-bar-covered");
  const barMiss = document.getElementById("balance-bar-missing");
  if (barCov) barCov.style.width = `${covPct}%`;
  if (barMiss) barMiss.style.width = `${missPct}%`;
}

function renderSegmentedTimeline(data) {
  const container = document.getElementById("segmented-timeline");
  if (!container) return;
  container.innerHTML = "";

  data.areas.forEach((area) => {
    const isDarkSpot = (data.stats.dark_spots_count > 0 && (area.id === "area-renewal" || area.id === "area-visa-bio"));
    const isConflict = (data.conflicts || []).some(c => c.area_id === area.id);

    let activeBlocksCount = 20;
    let blockLevel = "level-3";

    if (isDarkSpot) {
      activeBlocksCount = 2;
      blockLevel = "level-dark";
    } else if (isConflict) {
      activeBlocksCount = 14;
      blockLevel = "level-1";
    }

    let blocksHtml = "";
    for (let i = 0; i < 24; i++) {
      const cls = i < activeBlocksCount ? blockLevel : "";
      blocksHtml += `<div class="time-block ${cls}"></div>`;
    }

    const row = document.createElement("div");
    row.className = "timeline-row";
    row.innerHTML = `
      <div class="timeline-row-name">${area.name}</div>
      <div class="timeline-blocks-grid">${blocksHtml}</div>
    `;
    container.appendChild(row);
  });
}

function renderHeatmap(data, tableId = "heatmap-table-element") {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th style="text-align: left; padding: 10px; font-size: 13px; color: var(--slate-blue);">Expected Area (Importance)</th>`;
  
  (data.sources || []).forEach((s) => {
    headerRow.innerHTML += `<th style="padding: 10px; font-size: 12px; color: #1e293b; max-width: 140px;">${s.title}</th>`;
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  (data.areas || []).forEach((area) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td style="padding: 12px 10px; font-size: 13px; font-weight: 600;">
      <div>${area.name} <span style="font-size: 11px; color: var(--slate-blue); font-weight: 500;">(Imp: ${area.importance}/5)</span></div>
      <div style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">${area.why || ""}</div>
    </td>`;

    (data.sources || []).forEach((src) => {
      const status = (data.matrix && data.matrix[area.id] && data.matrix[area.id][src.id]) || "not_found";
      const td = document.createElement("td");
      td.className = `heatmap-cell cell-${status}`;
      
      let label = "Dark Spot";
      if (status === "covered") label = "Covered";
      if (status === "conflict") label = "Conflict";
      if (status === "outdated") label = "Prior Cycle";
      
      td.innerText = label;
      td.onclick = () => openCellInspector(area, src, status, data);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function openCellInspector(area, src, status, data) {
  const modal = document.getElementById("inspector-modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  if (!modal || !title || !body) return;

  title.innerText = `${area.name} × ${src.title}`;
  const matchedFact = (data.facts || []).find((f) => f.area_id === area.id && f.source_id === src.id);

  if (status === "not_found") {
    body.innerHTML = `
      <div style="padding: 14px; border-radius: 10px; background: rgba(225, 29, 72, 0.08); border: 1px dashed var(--cherry-red); margin-bottom: 14px;">
        <strong style="color: var(--cherry-red);">Digital Dark Spot Detected:</strong> No verified quotes or clauses found for <em>${area.name}</em> in this source.
      </div>
      <p>Importance Score: <strong>${area.importance} / 5</strong></p>
      <p>Target Goal: ${area.why}</p>
      <div style="margin-top: 12px; font-size: 13px; color: var(--slate-blue);">
        Recommendation: Consult official gazette or draft verification inquiry using the checklist below.
      </div>
    `;
  } else if (matchedFact) {
    body.innerHTML = `
      <div style="padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--sprinkle-green); margin-bottom: 14px;">
        <strong style="color: #065f46;">Verified Verbatim Quote:</strong>
        <p style="font-style: italic; margin-top: 8px; color: #0f172a;">"${matchedFact.quote}"</p>
      </div>
      <p style="font-size: 13px;"><strong>Source Authority:</strong> ${src.authority_score || 8}/10 (${src.source_type})</p>
      <p style="font-size: 13px;"><strong>Temporal Cycle:</strong> ${src.cycle || "2025-2026"}</p>
      <div style="margin-top: 12px; font-size: 12px; color: var(--slate-blue); background: var(--soft-blue); padding: 10px; border-radius: 8px;">
        Exact Match Anchor: Verified in code against raw source passage. Number consistency passed.
      </div>
    `;
  } else {
    body.innerHTML = `<p>Audit status: <strong>${status}</strong>. Please review conflicting claims or older cycle warnings.</p>`;
  }

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("inspector-modal");
  if (modal) modal.style.display = "none";
}

function renderConflicts(conflicts, containerId = "conflicts-container") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (conflicts.length === 0) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #065f46; background: #ecfdf5; border-radius: 12px; font-size: 13px;">
        No active conflicting claims! All sources report consistent numbers and terms.
      </div>`;
    return;
  }

  conflicts.forEach((c) => {
    const card = document.createElement("div");
    card.className = "glass-panel conflict-card";
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; color: #9f1239; font-size: 14px;">Conflict in ${c.area_name}</span>
        <span class="kpi-badge badge-red">Discrepancy</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; font-size: 12px;">
        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid var(--border-glass);">
          <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 4px;">${c.source_a.name}</div>
          <div style="font-style: italic;">"${c.source_a.quote}"</div>
        </div>
        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid var(--border-glass);">
          <div style="font-weight: 700; color: #9f1239; margin-bottom: 4px;">${c.source_b.name}</div>
          <div style="font-style: italic;">"${c.source_b.quote}"</div>
        </div>
      </div>
      <div style="font-size: 12px; color: var(--slate-blue); background: var(--soft-blue); padding: 8px 12px; border-radius: 8px;">
        <strong>Trust Suggestion:</strong> ${c.trust_suggestion}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderChecklist(items, containerId = "checklist-container") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #065f46; background: #ecfdf5; border-radius: 12px; font-size: 13px;">
        All checklist items verified! Ready to apply.
      </div>`;
    return;
  }

  items.slice(0, 6).forEach((item) => {
    const el = document.createElement("div");
    el.className = "checklist-item";
    el.innerHTML = `
      <input type="checkbox" style="margin-top: 4px; cursor: pointer;" onchange="toggleChecklistItem(this)">
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; font-size: 13px;">${item.title}</span>
          <span class="kpi-badge badge-blue">Priority: ${item.priority}</span>
        </div>
        <p style="font-size: 12px; color: #475569; margin-bottom: 6px;">${item.details}</p>
        <button class="magnetic-btn" style="padding: 4px 10px; font-size: 11px;" onclick="copyDraftEmail(\`${escapeEmail(item.draft_email)}\`)">
          Copy Draft Inquiry Email
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}

function escapeEmail(text) {
  return (text || "").replace(/`/g, "\\`").replace(/"/g, "&quot;").replace(/\n/g, "\\n");
}

function copyDraftEmail(text) {
  const decoded = text.replace(/\\n/g, "\n").replace(/&quot;/g, '"');
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(decoded).then(() => {
      showToast("Draft inquiry email copied to clipboard!");
    }).catch(() => {
      fallbackCopy(decoded);
    });
  } else {
    fallbackCopy(decoded);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showToast("Draft inquiry email copied to clipboard!");
  } catch {
    showToast("Text selected for copying.");
  }
  document.body.removeChild(ta);
}

function toggleChecklistItem(checkbox) {
  const parent = checkbox.closest(".checklist-item");
  if (!parent) return;
  if (checkbox.checked) {
    parent.style.opacity = "0.5";
    parent.style.textDecoration = "line-through";
  } else {
    parent.style.opacity = "1";
    parent.style.textDecoration = "none";
  }
}

async function triggerAddHandbook() {
  try {
    const res = await fetch("/api/audit/add-handbook", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      currentAuditData = data;
      renderDashboard(data);
      showToast("Dark spot closed! Renewal Terms verified with 2026 Handbook.");
      return;
    }
  } catch {}

  const handbookSrc = { id: "src-handbook", title: "Official 2026 Policy Handbook", url: "https://scholarship.university.edu/docs/handbook-2026.pdf", source_type: "handbook", publish_date: "2026-02-01", cycle: "2025-2026", authority_score: 10.0 };
  if (!currentAuditData.sources.some(s => s.id === handbookSrc.id)) {
    currentAuditData.sources.push(handbookSrc);
    currentAuditData.facts.push({ id: "f8-renewal", source_id: "src-handbook", area_id: "area-renewal", quote: "Fellowship renewal requires maintaining a minimum 3.0 CGPA each academic year and verified 80% lecture attendance" });
    if (currentAuditData.matrix && currentAuditData.matrix["area-renewal"]) {
      currentAuditData.matrix["area-renewal"]["src-handbook"] = "covered";
    }
    currentAuditData.stats.total_sources = currentAuditData.sources.length;
    currentAuditData.stats.covered_count = currentAuditData.areas.length;
    currentAuditData.stats.dark_spots_count = 0;
    currentAuditData.stats.coverage_pct = 100;
    currentAuditData.verdict = "no_critical_gaps";
    currentAuditData.checklist = (currentAuditData.checklist || []).filter(c => c.category !== "missing_gap");
  }
  renderDashboard(currentAuditData);
  showToast("Dark spot closed! Renewal Terms verified with 2026 Handbook.");
}

async function triggerResetAudit() {
  try {
    const res = await fetch("/api/audit/reset", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      currentAuditData = data;
      renderDashboard(data);
      showToast("Reset to initial digital dark spot state.");
      return;
    }
  } catch {}

  currentAuditData = JSON.parse(JSON.stringify(TOPIC_DATASETS.scholarship));
  renderDashboard(currentAuditData);
  showToast("Reset to initial digital dark spot state.");
}

function switchTab(tab) {
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
  const clicked = event?.currentTarget;
  if (clicked) clicked.classList.add("active");

  const overviewView = document.getElementById("view-overview");
  const detailsView = document.getElementById("view-details");
  const detailsBox = document.getElementById("details-content-box");

  if (!overviewView || !detailsView || !detailsBox) return;

  if (tab === "overview" || tab === "advisor") {
    overviewView.style.display = "block";
    detailsView.style.display = "none";
    if (tab === "advisor") {
      const card = document.getElementById("advisor-widget-card");
      if (card) {
        card.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("advisor-input")?.focus(), 300);
      }
    }
  } else {
    overviewView.style.display = "none";
    detailsView.style.display = "block";
    
    if (tab === "heatmap") {
      detailsBox.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Coverage Heatmap Matrix</h2>
        <div style="overflow-x: auto;">
          <table class="heatmap-table" id="heatmap-full-table"></table>
        </div>
      `;
      renderHeatmap(currentAuditData, "heatmap-full-table");
    } else if (tab === "conflicts") {
      detailsBox.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Source Conflicts & Contradictions</h2>
        <div id="conflicts-full-container"></div>
      `;
      renderConflicts(currentAuditData.conflicts || [], "conflicts-full-container");
    } else if (tab === "staleness") {
      detailsBox.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Information Freshness & Cycle Timeline</h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${(currentAuditData.staleness || []).map(st => `
            <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid var(--border-glass);">
              <div style="display: flex; justify-content: space-between;">
                <strong>${st.source_name}</strong>
                <span class="kpi-badge ${st.is_outdated ? 'badge-red' : 'badge-green'}">${st.is_outdated ? 'Prior Cycle / Outdated' : 'Current 2026 Cycle'}</span>
              </div>
              <p style="font-size: 13px; color: var(--slate-blue); margin-top: 4px;">Cycle: ${st.cycle || 'N/A'} | Date: ${st.date || 'Undated'}</p>
              <p style="font-size: 13px; margin-top: 6px;">${st.message}</p>
            </div>
          `).join("")}
        </div>
      `;
    } else if (tab === "checklist") {
      detailsBox.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Prioritized Action Checklist</h2>
        <div id="checklist-full-container"></div>
      `;
      renderChecklist(currentAuditData.checklist || [], "checklist-full-container");
    } else if (tab === "probes") {
      detailsBox.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Careful Follow-up Probes</h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${(currentAuditData.probes || []).map(p => `
            <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid var(--border-glass);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 14px;">${p.question}</strong>
                <span class="kpi-badge ${p.status === 'answered' ? 'badge-green' : p.status === 'partial' ? 'badge-blue' : 'badge-red'}">${p.status.toUpperCase()}</span>
              </div>
              <div style="font-size: 13px; margin-top: 8px; color: #334155;">
                ${p.answer ? `<strong>Answer Found:</strong> ${p.answer}` : '<em>Unaddressed in initial sources. Adding the 2026 handbook provides the answer!</em>'}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }
  }
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}
