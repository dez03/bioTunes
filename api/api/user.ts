// api/user.js
const db = require("../db");
const { authenticateToken } = require("../utils");

module.exports = (req, res) => {
  authenticateToken(req, res, () => {
    db.get("SELECT * FROM users WHERE id = ?", [req.user.id], (err, row) => {
      if (err) {
        console.error("Error fetching user data", err);
        return res.status(500).json({ error: "Failed to fetch user data" });
      }
      if (!row) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        id: row.id,
        displayName: row.display_name,
        email: row.email,
        profileImage: row.profile_image,
      });
    });
  });
};
