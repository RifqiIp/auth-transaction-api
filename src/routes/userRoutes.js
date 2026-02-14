const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");
const ROLES = require("../constants/roles");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authorized",
    user: req.user,
  });
});

// contoh admin-only
router.get(
  "/admin",
  authMiddleware,
  authorizeRole([ROLES.ADMIN]),
  (req, res) => {
    res.json({ message: "Welcome admin" });
  },
);

module.exports = router;
