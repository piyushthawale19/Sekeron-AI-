# ARTIVA INTELLIGENCE — Evidence-Led Creative Talent Discovery Platform

**SEKERON AI Intern Stage 3 Assessment: Artist Intelligence & Contextual Recommendation System**

Tagline: *Evidence-led creative talent discovery.*

---

## Architecture Overview

ARTIVA Intelligence is a full-stack creative talent intelligence platform designed to solve two core assessment problems:

1. **Artist Intelligence Engine**: Evaluates 15 artists across Photographers, Musicians, and Video Editors by strictly separating **Profile Claims** from **Demonstrated Evidence** (with source file references & timestamps) and **Unknowns**. Handles 1 damaged/incomplete portfolio case (`artist_07`) without hallucination.
2. **Contextual Recommendation & Dynamic Re-Ranking Workbench**: Interprets incomplete hirer briefs into explicit constraints, assumptions, and unknowns. Recommends top 2 candidates with trade-offs, limits refinement questions to max 2, and dynamically re-ranks candidates when follow-up hirer information arrives with a clear Before/After change audit.

```
Sekeron AI Internship/
├── backend/
│   ├── src/
│   │   ├── data/dataset.js                 # 15 Artists, 4 Briefs, 1 Follow-up update
│   │   ├── services/intelligenceService.js # Claims vs Evidence processor & JSONL generator
│   │   ├── services/recommendationService.js # Brief matcher, trade-offs & re-ranking engine
│   │   ├── scripts/generateOutputs.js      # Output generator script
│   │   ├── scripts/verify.js               # Automated assessment audit script
│   │   └── server.js                       # Zero-dependency standalone HTTP server (Port 5000)
│   └── .env.example
├── frontend/
│   ├── public/index.html                   # Standalone B2B agency interface
│   └── src/                                # React components (Navbar, Dashboard, Directory, Workbench)
├── artist_intelligence.jsonl               # REQUIRED OUTPUT 1
├── recommendations.json                    # REQUIRED OUTPUT 2
├── updated_recommendation.json             # REQUIRED OUTPUT 3
├── decision_note.md                        # 1-Page Architecture Summary
├── AI_USAGE.md                             # AI Disclosure & Verification Document
└── README.md                               # Project documentation & run guide
```

---

## One-Command Quick Start

The backend server is standalone zero-dependency Node.js code. Run the following single command from the project root:

```bash
node backend/src/server.js
```

Upon launching:
- **Server starts at**: `http://localhost:5000`
- **Output files automatically generated/verified**:
  - `artist_intelligence.jsonl`
  - `recommendations.json`
  - `updated_recommendation.json`

---

## Automated Compliance Verification Script

To run the automated Sekeron assessment compliance audit:

```bash
node backend/src/scripts/verify.js
```

### Verification Checks Performed:
- [x] Dataset contains exactly 15 artists across 3 categories.
- [x] Incomplete portfolio case (`artist_07`) flagged as `INCOMPLETE` with `LOW` confidence and explicit unknown statements.
- [x] All capability records strictly separate claims, evidence, and unknowns.
- [x] Hirer briefs return exactly 2 candidate recommendations with trade-offs.
- [x] Refinement questions capped at maximum 2.
- [x] Follow-up update for Brief 01 triggers candidate re-ranking with Before/After change audit (`Sophia Rossi: UNRANKED → #1 UP`, `Leo Sterling: #1 → DROPPED DOWN`).
- [x] Output files `artist_intelligence.jsonl`, `recommendations.json`, and `updated_recommendation.json` verified.

---

## Key Features & Business Logic

### 1. Claims vs Evidence vs Unknowns
- **PROFILE CLAIM**: Information asserted in artist bio text.
- **DEMONSTRATED EVIDENCE**: Verified in supplied portfolio (e.g., `artist_01/img_01.jpg`, `editor_04/reel_02.mp4 @ 00:11-00:24`).
- **UNKNOWNS**: Capabilities system cannot verify from media.
- **NON-INFERENCE DIRECTIVE**: Subjective attributes (reliability, character, popularity) are strictly non-inferred.

### 2. Category-Specific Intelligence
- **Photographers**: Subject, studio vs outdoor lighting, reflection control, fashion vs product composition.
- **Musicians**: Genre, instruments/vocals, solo vs ensemble, dynamic build.
- **Video Editors**: Aspect ratio (9:16 vs 16:9), pacing, motion graphics, documentary L-cuts, color grading.

---

## Environment Variables (.env.example)

```env
PORT=5000
JWT_SECRET=artiva_intelligence_super_secret_jwt_key_2026_sekeron
NODE_ENV=development
```
