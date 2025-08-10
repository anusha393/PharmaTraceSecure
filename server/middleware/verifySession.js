module.exports = function requireAuth(req, res, next) {
  if (req.session.siwe) return next();
  res.status(401).json({ error: "Unauthorized" });
};
