from typing import Dict, List, Any

class GapLensDB:
    def __init__(self):
        self.users: Dict[str, Dict[str, Any]] = {
            "krishn@gaplens.ai": {
                "name": "Krishn Kushwaha",
                "role": "Lead Full-Stack AI Engineer",
                "team": "AI Systems Lab",
                "avatar": "KK"
            }
        }
        self.current_user: Dict[str, Any] = None
        self.sources: List[Dict[str, Any]] = []
        self.expected_areas: List[Dict[str, Any]] = []
        self.facts: List[Dict[str, Any]] = []
        self.probes: List[Dict[str, Any]] = []
        self.audit_history: List[Dict[str, Any]] = []
        self.reset_to_default_scholarship()

    def reset_to_default_scholarship(self):
        self.expected_areas = [
            {"id": "area-eligibility", "name": "Eligibility Criteria", "importance": 5, "why": "Base prerequisite: GPA, enrollment, citizen status."},
            {"id": "area-docs", "name": "Document Requirements", "importance": 4, "why": "Mandatory certificates; missing docs lead to disqualification."},
            {"id": "area-renewal", "name": "Renewal Conditions", "importance": 5, "why": "Critical multi-year retention terms; digital dark spot if absent."},
            {"id": "area-deadline", "name": "Application Deadline", "importance": 4, "why": "Submission window closure; past dates void applications."},
            {"id": "area-income", "name": "Income Ceiling", "importance": 3, "why": "Family financial cap; common conflict area between sources."},
            {"id": "area-disbursement", "name": "Disbursement Schedule", "importance": 2, "why": "Term distribution frequency for tuition allowance."}
        ]

        self.sources = [
            {
                "id": "src-portal",
                "title": "Official University Portal",
                "url": "https://scholarship.university.edu/merit-2026",
                "source_type": "official",
                "publish_date": "2026-01-15",
                "cycle": "2025-2026",
                "authority_score": 9.5,
                "content": "The 2025-2026 Merit Fellowship invites applications from full-time undergraduates with minimum CGPA of 3.2. Mandatory documents include valid national ID, certified transcripts, and verified parental income certificate below $45,000 annually. Application deadline is 31 March 2026. Disbursements occur in two equal semester installments."
            },
            {
                "id": "src-forum",
                "title": "Student Discussion Forum",
                "url": "https://studenttalk.org/threads/scholarship-query",
                "source_type": "forum",
                "publish_date": "2024-03-10",
                "cycle": "Fall 2023",
                "authority_score": 4.0,
                "content": "In our Fall 2023 batch, the income ceiling was stated as $60,000 annual household earnings. Required submission only asked for self-declared pay stubs, not official tax forms."
            },
            {
                "id": "src-news",
                "title": "Education Gazette Bulletin",
                "url": "https://edunews.org/circulars/higher-ed-2025",
                "source_type": "news",
                "publish_date": "2025-11-20",
                "cycle": "2025-2026",
                "authority_score": 6.5,
                "content": "The Higher Education Department opened the 2025-2026 cycle. Applicants must maintain full-time undergraduate standing. Final deadline for submissions is 31 March 2026."
            }
        ]

        self.facts = [
            {"id": "f1", "source_id": "src-portal", "area_id": "area-eligibility", "quote": "full-time undergraduates with minimum CGPA of 3.2", "verified": True},
            {"id": "f2", "source_id": "src-portal", "area_id": "area-docs", "quote": "Mandatory documents include valid national ID, certified transcripts, and verified parental income certificate below $45,000 annually", "verified": True},
            {"id": "f3", "source_id": "src-portal", "area_id": "area-deadline", "quote": "Application deadline is 31 March 2026", "verified": True},
            {"id": "f4", "source_id": "src-portal", "area_id": "area-disbursement", "quote": "Disbursements occur in two equal semester installments", "verified": True},
            {"id": "f5", "source_id": "src-portal", "area_id": "area-income", "quote": "parental income certificate below $45,000 annually", "verified": True},
            {"id": "f6", "source_id": "src-forum", "area_id": "area-income", "quote": "income ceiling was stated as $60,000 annual household earnings", "verified": True},
            {"id": "f7", "source_id": "src-news", "area_id": "area-deadline", "quote": "Final deadline for submissions is 31 March 2026", "verified": True}
        ]

        self.probes = [
            {"id": "p1", "question": "What minimum CGPA or attendance standard is mandatory to renew funding for year 2?", "status": "unanswered", "answer": None},
            {"id": "p2", "question": "Is income verification restricted to official tax assessments or are pay stubs permitted?", "status": "partial", "answer": "Official portal cites tax certified income certificate below $45,000; forum mentions self-declared pay stubs."},
            {"id": "p3", "question": "When is the final application submission cutoff date?", "status": "answered", "answer": "31 March 2026 verified across official portal and education gazette."}
        ]

db = GapLensDB()

