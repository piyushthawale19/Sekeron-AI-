const fs = require('fs');
const path = require('path');
const dataset = require('../data/dataset');

console.log("=== ARTIVA INTELLIGENCE ASSESSMENT COMPLIANCE AUDIT ===");

let passed = true;

function check(description, condition) {
  if (condition) {
    console.log(`[PASS] ${description}`);
  } else {
    console.error(`[FAIL] ${description}`);
    passed = false;
  }
}

// 1. Check Artists Count & Categories
check("Dataset contains exactly 15 artists", dataset.artists.length === 15);

const categories = new Set(dataset.artists.map(a => a.category));
check("Dataset covers Photographers, Musicians, Video Editors", 
  categories.has('Photographer') && categories.has('Musician') && categories.has('Video Editor')
);

// 2. Check Incomplete Portfolio Handling
const incompleteArtist = dataset.artists.find(a => a.portfolioStatus === 'INCOMPLETE');
check("Incomplete portfolio artist (artist_07) exists", !!incompleteArtist);
check("Incomplete artist confidence is LOW", incompleteArtist && incompleteArtist.confidence === 'LOW');
check("Incomplete artist contains clear Unknown statements", incompleteArtist && incompleteArtist.unknowns.length > 0);

// 3. Claims vs Evidence Separation
let hasSeparateClaimsAndEvidence = true;
dataset.artists.forEach(a => {
  if (!a.profileClaims || !Array.isArray(a.profileClaims)) hasSeparateClaimsAndEvidence = false;
  if (!a.demonstratedCapabilities || !Array.isArray(a.demonstratedCapabilities)) hasSeparateClaimsAndEvidence = false;
  if (!a.unknowns || !Array.isArray(a.unknowns)) hasSeparateClaimsAndEvidence = false;
});
check("All artists strictly separate Profile Claims, Demonstrated Capabilities, and Unknowns", hasSeparateClaimsAndEvidence);

// 4. Recommendation Count & Trade-offs
const brief1 = dataset.briefs.find(b => b.id === 'brief_01');
check("Brief 01 returns exactly 2 top matches", brief1 && brief1.initialRecommendations.topMatches.length === 2);
check("Top matches contain explicit trade-offs and confidence", brief1 && brief1.initialRecommendations.topMatches.every(m => m.tradeoffs && m.confidence));
check("Refinement questions limited to max 2", brief1 && brief1.initialRecommendations.refinementQuestions.length <= 2);

// 5. Follow-up Re-ranking Logic
check("Brief 01 has follow-up update", brief1 && !!brief1.followUpUpdate);
check("Follow-up re-ranking contains Before/After change audit", 
  brief1 && brief1.followUpUpdate.updatedRecommendations.changesAudit.length > 0
);

// 6. Check Output Files Existence
const rootDir = path.join(__dirname, '../../../');
const jsonlExists = fs.existsSync(path.join(rootDir, 'artist_intelligence.jsonl'));
const recsExists = fs.existsSync(path.join(rootDir, 'recommendations.json'));
const updatedExists = fs.existsSync(path.join(rootDir, 'updated_recommendation.json'));

check("Generated artist_intelligence.jsonl file exists", jsonlExists);
check("Generated recommendations.json file exists", recsExists);
check("Generated updated_recommendation.json file exists", updatedExists);

console.log("-----------------------------------------------------");
if (passed) {
  console.log(">>> AUDIT RESULT: ALL COMPLIANCE CHECKS PASSED SUCCESSFULLY! <<<");
} else {
  console.error(">>> AUDIT RESULT: AUDIT FAILED WITH ERRORS. <<<");
  process.exit(1);
}
