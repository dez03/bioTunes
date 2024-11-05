// api/auth/spotify-callback.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const db = require("../../db");

module.exports = async function handler(req, res) {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          client_id: process.env.SPOTIFY_CLIENT_ID,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id: spotify_id, display_name, email, images } = userResponse.data;
    const profile_image = images.length > 0 ? images[0].url : null;
    const expiryDate = new Date(Date.now() + expires_in * 1000).toISOString();

    db.run(
      `INSERT OR REPLACE INTO users (id, display_name, email, spotify_id, spotify_access_token, spotify_refresh_token, token_expiry, profile_image) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        spotify_id,
        display_name,
        email,
        spotify_id,
        access_token,
        refresh_token,
        expiryDate,
        profile_image,
      ],
      function (err) {
        if (err) {
          console.error("Error saving user to database", err);
          return res
            .status(500)
            .json({ error: "Failed to save user data", details: err.message });
        }

        const token = jwt.sign({ id: spotify_id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.redirect(`${process.env.FRONTEND_URL}/success?token=${token}`);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Authentication failed", details: error.message });
  }
};
