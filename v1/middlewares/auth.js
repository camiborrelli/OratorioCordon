// Simple auth middleware for examples
// Accepts an Authorization header with a static token: "Bearer secrettoken"
module.exports = function auth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no provisto' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  // Example: static token check — replace with real verification in production
  if (token !== process.env.EXAMPLE_TOKEN && token !== 'secrettoken') {
    return res.status(403).json({ message: 'Token inválido' });
  }
  next();
};
