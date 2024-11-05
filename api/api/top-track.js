// api/top-track.js
const { getSpotifyData, getUserWithValidToken } = require("../utils");

module.exports = async function handler(req, res) {
  try {
    const user = await getUserWithValidToken(req.user.id);
    const data = await getSpotifyData(
      "/me/top/tracks?time_range=short_term&limit=1",
      user.spotify_access_token
    );

    if (data && data.items && data.items.length > 0) {
      res.json({
        track: data.items[0].name,
        artist: data.items[0].artists[0].name,
      });
    } else {
      res.json({ message: "No top track found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch top track", details: error.message });
  }
};
