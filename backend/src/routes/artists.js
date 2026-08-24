const express = require('express');
const IntelligenceService = require('../services/intelligenceService');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/artists - List all artists with optional category, search, and confidence filters
router.get('/', (req, res) => {
  let artists = IntelligenceService.getAllArtists();
  const { category, search, confidence } = req.query;

  if (category) {
    artists = artists.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  if (confidence) {
    artists = artists.filter(a => a.confidence.toLowerCase() === confidence.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    artists = artists.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.style.toLowerCase().includes(q) ||
      a.demonstratedCapabilities.some(c => c.capability.toLowerCase().includes(q))
    );
  }

  return res.json({
    total: artists.length,
    artists: artists.map(a => ({
      id: a.id,
      name: a.name,
      category: a.category,
      style: a.style,
      portfolioStatus: a.portfolioStatus,
      confidence: a.confidence,
      evidenceCount: a.demonstratedCapabilities.length,
      claimsCount: a.profileClaims.length,
      primaryCapability: a.demonstratedCapabilities[0]?.capability || 'None demonstrated',
      portfolioPreview: a.mediaFiles[0]?.id || 'No media'
    }))
  });
});

// GET /api/artists/:id - Get full detailed intelligence record for an artist
router.get('/:id', (req, res) => {
  const artist = IntelligenceService.getArtistById(req.params.id);
  if (!artist) {
    return res.status(404).json({ error: 'Artist record not found.' });
  }

  return res.json({
    artist,
    formattedRecord: IntelligenceService.formatArtistRecord(artist)
  });
});

// GET /api/artists/:id/intelligence - Shortcut to formatted JSONL structure for single artist
router.get('/:id/intelligence', (req, res) => {
  const artist = IntelligenceService.getArtistById(req.params.id);
  if (!artist) {
    return res.status(404).json({ error: 'Artist record not found.' });
  }
  return res.json(IntelligenceService.formatArtistRecord(artist));
});

module.exports = router;
