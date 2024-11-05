// api/auth/spotify.js
const { VercelRequest, VercelResponse } = require("@vercel/node");

module.exports = function handler(req, res) {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-read-recently-played",
  ];

  const spotifyAuthUrl =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&redirect_uri=" +
    encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);

  res.redirect(spotifyAuthUrl);
};
