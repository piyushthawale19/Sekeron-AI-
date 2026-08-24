const express = require('express');
const RecommendationService = require('../services/recommendationService');

const router = express.Router();

// GET /api/recommendations/:briefId - Get top recommendations for a brief
router.get('/:briefId', (req, res) => {
  const recs = RecommendationService.getRecommendationsForBrief(req.params.briefId);
  if (!recs) {
    return res.status(404).json({ error: 'Recommendations not found for this brief ID.' });
  }
  return res.json(recs);
});

// GET /api/recommendations/:briefId/updated - Get updated re-ranked recommendations after follow-up hirer update
router.get('/:briefId/updated', (req, res) => {
  const updatedRecs = RecommendationService.getUpdatedRecommendationsForBrief(req.params.briefId);
  if (!updatedRecs) {
    return res.status(404).json({ error: 'Updated recommendations not found for this brief ID.' });
  }
  return res.json(updatedRecs);
});

module.exports = router;
