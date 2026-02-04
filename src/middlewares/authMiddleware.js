const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek Header
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  // ambil token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan token
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;