// api/top-artist.js
const { getSpotifyData, getUserWithValidToken } = require("../utils");

module.exports = async function handler(req, res) {
  try {
    const user = await getUserWithValidToken(req.user.id);
    const data = await getSpotifyData(
      "/me/top/artists?time_range=short_term&limit=1",
      user.spotify_access_token
    );

    if (data.items && data.items.length > 0) {
      const topArtist = data.items[0].name;
      res.json({ artist: topArtist });
    } else {
      res.json({ message: "No top artist found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch top artist", details: error.message });
  }
};
