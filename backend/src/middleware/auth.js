const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'artiva_intelligence_super_secret_jwt_key_2026_sekeron';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. Authentication token required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired authentication token." });
  }
}

module.exports = { authenticateToken, JWT_SECRET };
