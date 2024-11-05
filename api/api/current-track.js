// api/top-album.js
const { getSpotifyData, getUserWithValidToken } = require("../utils");

module.exports = async function handler(req, res) {
  try {
    const user = await getUserWithValidToken(req.user.id);
    const data = await getSpotifyData(
      "/me/top/tracks?time_range=short_term&limit=50",
      user.spotify_access_token
    );

    const topAlbumMap = data.items.reduce((acc, track) => {
      const albumName = track.album.name;
      const artistName = track.album.artists[0].name;
      if (!acc[albumName]) {
        acc[albumName] = { count: 0, artist: artistName };
      }
      acc[albumName].count += 1;
      return acc;
    }, {});

    const sortedAlbums = Object.entries(topAlbumMap).sort(
      (a, b) => b[1].count - a[1].count
    );

    if (sortedAlbums.length > 0) {
      const topAlbum = sortedAlbums[0][0];
      const topArtist = sortedAlbums[0][1].artist;
      res.json({ album: topAlbum, artist: topArtist });
    } else {
      res.json({ message: "No top album found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch top album", details: error.message });
  }
};
