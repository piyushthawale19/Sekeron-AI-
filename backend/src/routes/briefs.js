const express = require('express');
const RecommendationService = require('../services/recommendationService');

const router = express.Router();

// GET /api/briefs - List all hirer briefs
router.get('/', (req, res) => {
  const briefs = RecommendationService.getAllBriefs();
  return res.json({ total: briefs.length, briefs });
});

// GET /api/briefs/:id - Get specific hirer brief with full details
router.get('/:id', (req, res) => {
  const brief = RecommendationService.getBriefById(req.params.id);
  if (!brief) {
    return res.status(404).json({ error: 'Brief not found.' });
  }
  return res.json({ brief });
});

module.exports = router;
