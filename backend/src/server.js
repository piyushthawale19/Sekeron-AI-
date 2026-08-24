const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const dataset = require('./data/dataset');
const IntelligenceService = require('./services/intelligenceService');
const RecommendationService = require('./services/recommendationService');

const PORT = process.env.PORT || 5000;

// Auto-generate JSON/JSONL outputs on server start
const rootDirectory = path.join(__dirname, '../../');
try {
  IntelligenceService.generateJsonlOutput(rootDirectory);
  RecommendationService.generateJsonOutputs(rootDirectory);
  console.log('[ARTIVA ENGINE] Output files (artist_intelligence.jsonl, recommendations.json, updated_recommendation.json) successfully created.');
} catch (err) {
  console.error('[ARTIVA ENGINE WARNING] Output generation error:', err.message);
}

// In-memory demo users
const users = [
  { id: 'user_demo_01', name: 'Producer Demo User', email: 'demo@artiva.ai', role: 'Creative Director' }
];

function sendJSON(res, statusCode, data) {
  const allowedOrigin = process.env.CLIENT_ORIGIN || '*';
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    const allowedOrigin = process.env.CLIENT_ORIGIN || '*';
    res.writeHead(204, {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }


  // Static HTML File Serving
  if ((pathname === '/' || pathname === '/index.html') && method === 'GET') {
    const htmlPath = path.join(__dirname, '../../frontend/public/index.html');
    if (fs.existsSync(htmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(fs.readFileSync(htmlPath));
    }
  }

  // API Routes
  if (pathname === '/api/health' && method === 'GET') {

    return sendJSON(res, 200, {
      status: 'ONLINE',
      system: 'ARTIVA INTELLIGENCE ENGINE',
      version: '1.0.0',
      stats: { totalArtists: 15, briefsEvaluated: 4, damagedPortfoliosDetected: 1 }
    });
  }

  // AUTH API
  if (pathname === '/api/auth/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      return sendJSON(res, 200, {
        message: 'Login successful.',
        token: 'artiva_jwt_token_demo_mode_2026',
        user: users[0]
      });
    });
    return;
  }

  if (pathname === '/api/auth/register' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const newUser = { id: `user_${Date.now()}`, name: 'New User', email: 'user@artiva.ai', role: 'Producer' };
      return sendJSON(res, 201, {
        message: 'Account created successfully.',
        token: 'artiva_jwt_token_demo_mode_2026',
        user: newUser
      });
    });
    return;
  }

  // ARTISTS API
  if (pathname === '/api/artists' && method === 'GET') {
    let artists = IntelligenceService.getAllArtists();
    const query = parsedUrl.query;

    if (query.category) {
      artists = artists.filter(a => a.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.confidence) {
      artists = artists.filter(a => a.confidence.toLowerCase() === query.confidence.toLowerCase());
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      artists = artists.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.style.toLowerCase().includes(q) ||
        a.demonstratedCapabilities.some(c => c.capability.toLowerCase().includes(q))
      );
    }

    return sendJSON(res, 200, {
      total: artists.length,
      artists: artists.map(a => ({
        id: a.id,
        name: a.name,
        category: a.category,
        style: a.style,
        portfolioStatus: a.portfolioStatus,
        confidence: a.confidence,
        claimsCount: a.profileClaims.length,
        evidenceCount: a.demonstratedCapabilities.length,
        primaryCapability: a.demonstratedCapabilities[0]?.capability || 'None demonstrated',
        portfolioPreview: a.mediaFiles[0]?.id || 'No media'
      }))
    });
  }

  if (pathname.startsWith('/api/artists/') && method === 'GET') {
    const parts = pathname.split('/');
    const id = parts[3];

    const artist = IntelligenceService.getArtistById(id);
    if (!artist) {
      return sendJSON(res, 404, { error: 'Artist record not found.' });
    }

    return sendJSON(res, 200, {
      artist,
      formattedRecord: IntelligenceService.formatArtistRecord(artist)
    });
  }

  // BRIEFS API
  if (pathname === '/api/briefs' && method === 'GET') {
    return sendJSON(res, 200, {
      total: dataset.briefs.length,
      briefs: RecommendationService.getAllBriefs()
    });
  }

  if (pathname.startsWith('/api/briefs/') && method === 'GET') {
    const parts = pathname.split('/');
    const id = parts[3];
    const brief = RecommendationService.getBriefById(id);
    if (!brief) return sendJSON(res, 404, { error: 'Brief not found.' });
    return sendJSON(res, 200, { brief });
  }

  // RECOMMENDATIONS API
  if (pathname.startsWith('/api/recommendations/') && method === 'GET') {
    const parts = pathname.split('/');
    const briefId = parts[3];
    const isUpdated = parts[4] === 'updated';

    if (isUpdated) {
      const updated = RecommendationService.getUpdatedRecommendationsForBrief(briefId);
      return sendJSON(res, 200, updated);
    } else {
      const recs = RecommendationService.getRecommendationsForBrief(briefId);
      return sendJSON(res, 200, recs);
    }
  }

  // Fallback 404
  return sendJSON(res, 404, { error: 'Endpoint not found.' });
});

let currentPort = PORT;

function startServer(p) {
  server.listen(p, () => {
    console.log(`[ARTIVA INTELLIGENCE ENGINE] Standalone Server running on http://localhost:${p}`);
  });
}

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    currentPort += 1;
    console.log(`[ARTIVA ENGINE] Port occupied, trying http://localhost:${currentPort}...`);
    setTimeout(() => startServer(currentPort), 200);
  } else {
    console.error(e);
  }
});

startServer(currentPort);


