const path = require('path');
const IntelligenceService = require('../services/intelligenceService');
const RecommendationService = require('../services/recommendationService');

console.log("=== ARTIVA INTELLIGENCE OUTPUT GENERATOR ===");

// Directory to output files (root of project)
const targetDir = path.join(__dirname, '../../../');

try {
  const jsonlPath = IntelligenceService.generateJsonlOutput(targetDir);
  console.log(`[SUCCESS] Generated: ${jsonlPath}`);

  const { recsFilePath, updatedFilePath } = RecommendationService.generateJsonOutputs(targetDir);
  console.log(`[SUCCESS] Generated: ${recsFilePath}`);
  console.log(`[SUCCESS] Generated: ${updatedFilePath}`);

  console.log("=== ALL REQUIRED OUTPUT FILES GENERATED SUCCESSFULLY ===");
} catch (err) {
  console.error("[ERROR] Failed to generate output files:", err);
  process.exit(1);
}
