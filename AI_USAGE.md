# AI Usage & Verification Disclosure (AI_USAGE.md)

This document provides transparent disclosure regarding AI usage, code generation, independent human verification, and empirical audit procedures conducted for the **SEKERON AI Intern Stage 3 Assessment: Artist Intelligence & Recommendation**.

---

## 1. AI Coding Assistants & Models Used
- **Assistant / Environment**: Cursor / Gemini / Antigravity AI Coding Environment.
- **Underlying Models**: Google Gemini 3.6 Flash & Claude Code architectures.

---

## 2. What AI Generated vs What Was Manually Verified / Corrected

| Component / Task | AI Assistance Role | Human Review & Manual Verification |
| :--- | :--- | :--- |
| **Dataset & Ground Truth Architecture** | Drafted initial 15 artist profiles & media metadata structure. | Verified strict claim vs evidence separation. Ensured 1 incomplete portfolio test case (Artist 07) was included with `portfolioStatus: INCOMPLETE` and `confidence: LOW`. |
| **Intelligence Audit Pipeline** | Formatted JSONL transformer script. | Inspected capability extractions. Verified that zero subjective attributes (punctuality, character, reliability) were inferred from media samples. |
| **Recommendation Engine & Trade-offs** | Implemented brief parser and candidate ranking matcher. | Audited candidate matches to ensure top 2 candidate constraints were respected, trade-offs were explicit, and refinement questions were strictly capped at 2. |
| **Re-Ranking Engine & Follow-Up Audit** | Built update handler for Brief 01. | Verified Before/After change audit (`Sophia Rossi` moving to #1 for cinematic documentary; `Leo Sterling` dropping due to short-form reel contradiction). |
| **Backend REST API** | Authored Node.js server routes. | Converted backend into a zero-dependency standalone Node HTTP server to overcome npm disk space constraints and guarantee 100% offline execution. |
| **Frontend B2B Interface** | Created dark-mode B2B agency design system in React/Tailwind. | Verified responsive layout, badge contrast, tab navigation, and evidence timestamp visibility. |

---

## 3. Empirical Verification & Automated Audits
The codebase was verified using the automated compliance script `backend/src/scripts/verify.js`:
- Verified 15 artist records across 3 categories.
- Verified 1 damaged portfolio case (Artist 07) returning `LOW` confidence and zero hallucinated claims.
- Verified exact creation of output files:
  1. `artist_intelligence.jsonl`
  2. `recommendations.json`
  3. `updated_recommendation.json`
- Verified dynamic re-ranking audit for Hirer Brief 01.

---

## 4. Integrity Statement
All generated outputs and recommendations were audited and verified for exact compliance with assessment requirements. No claims were presented as unverified, and all evidence links reference explicit source files and timestamps.
