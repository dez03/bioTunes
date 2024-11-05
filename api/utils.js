// api/utils.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const db = require("./db");

async function getSpotifyData(endpoint, accessToken) {
  const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

async function getUserWithValidToken(userId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [userId], async (err, user) => {
      if (err) reject(err);
      if (!user) reject(new Error("User not found"));

      if (new Date(user.token_expiry) <= new Date()) {
        try {
          const newToken = await refreshSpotifyToken(
            user.spotify_refresh_token
          );
          user.spotify_access_token = newToken.access_token;
          user.token_expiry = new Date(
            Date.now() + newToken.expires_in * 1000
          ).toISOString();

          db.run(
            "UPDATE users SET spotify_access_token = ?, token_expiry = ? WHERE id = ?",
            [user.spotify_access_token, user.token_expiry, user.id]
          );
        } catch (error) {
          reject(error);
        }
      }

      resolve(user);
    });
  });
}

async function refreshSpotifyToken(refreshToken) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

module.exports = { getSpotifyData, authenticateToken, getUserWithValidToken };
