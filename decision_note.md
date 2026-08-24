# Decision Note: ARTIVA Intelligence Architecture

## System Overview & Objectives
**ARTIVA Intelligence** is an evidence-backed creative talent discovery and recommendation platform built for the **Sekeron AI Intern Stage 3 Assessment**. The platform solves two core problems:
1. **Artist Intelligence Audit**: Distinguishing between profile claims, demonstrated portfolio evidence (with timestamps & media identifiers), and unverified unknowns across 15 creative artists (Photographers, Musicians, Video Editors), while explicitly handling damaged/incomplete portfolio cases without hallucination.
2. **Contextual Recommendation & Dynamic Re-Ranking Engine**: Matching incomplete hirer briefs to evidence-backed capabilities, producing top 2 candidate recommendations with trade-offs, limiting refinement questions to max 2, and dynamically re-ranking candidates when new hirer constraints arrive with clear Before/After change audits.

---

## Architectural Choices & Key Decisions

### 1. Data Model & Claim vs Evidence Separation
- **Profile Claims**: Direct assertions from the artist bio (e.g., "10 years experience", "commercial fashion editor").
- **Demonstrated Evidence**: Empirical observations directly supported by supplied media samples (e.g., `artist_01/img_01.jpg`, `editor_04/reel_02.mp4 @ 00:11-00:24`).
- **Unknowns & Uncertainty**: Explicit fields recording what cannot be determined (e.g., outdoor daylight handling, long-form narrative pacing).
- **Strict Non-Inference Integrity Guard**: The engine strictly forbids making subjective inferences regarding character, punctuality, reliability, popularity, or personality from media.

### 2. Category-Specific Intelligence Dimensions
Capability dimensions are custom-tailored per creative category:
- **Photographers**: Subject, lighting (studio vs outdoor), composition, studio setup, reflection control.
- **Musicians**: Genre, vocal role, instrument accompaniment, dynamic build, rhythm programming.
- **Video Editors**: Aspect ratio (9:16 vs 16:9), pacing, motion graphics, color grading, multi-cam cutaway.

### 3. Contextual Recommendation & Follow-Up Re-Ranking
- **Incomplete Brief Interpretation**: Briefs are parsed into *Explicit Constraints*, *Reasonable Assumptions*, *Contradictions*, and *Unknowns*.
- **Top Candidates & Trade-offs**: Exactly 2 candidates are recommended per brief whenever plausible, with explicit trade-offs and confidence scores (`HIGH`, `MEDIUM`, `LOW`).
- **Refinement Questions**: Max 2 high-impact questions are generated under "Improve Your Matches", detailing exact ranking impact.
- **Dynamic Re-Ranking Audit**: When Hirer Brief 01 receives a follow-up update (shifting from vertical reels to 2-minute cinematic documentary), the engine updates the ranking order (`Sophia Rossi: UNRANKED → #1 UP`, `Leo Sterling: #1 → DROPPED DOWN`) and explains the capability rationale.

### 4. Zero-Dependency Standalone API & Deterministic Reproducibility
- The backend relies on a zero-external-dependency Node HTTP engine running synchronously on port 5000.
- Upon startup, the engine automatically compiles and outputs `artist_intelligence.jsonl`, `recommendations.json`, and `updated_recommendation.json` to the root directory for 100% submission reproducibility.

---

## Output Verification Summary
- `artist_intelligence.jsonl`: 15 JSON lines containing full claim vs evidence breakdown & damaged portfolio case audit.
- `recommendations.json`: Structured recommendations for 4 hirer briefs with explicit interpretation and top 2 matches.
- `updated_recommendation.json`: Re-ranking audit for Brief 01 follow-up update with Before/After change audit.
