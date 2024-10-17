require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const db = require("./db");
const dataManagement = require("./dataManagement");
const app = express();

dataManagement.setDb(db);

//TODO Change URL 
//FIXME Change URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

// Spotify authentication route
app.get("/auth/spotify", (req, res) => {
  // All the scopes needed
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-read-recently-played",
  ];
  // New URL created
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
});

// Spotify callback route
app.get('/auth/spotify/callback', async (req, res) => {
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

    // Log the access token to the console
    console.log("Access Token:", access_token);

    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id: spotify_id, display_name, email, images } = userResponse.data;
    const profile_image = images.length > 0 ? images[0].url : null;

    const expiryDate = new Date(Date.now() + expires_in * 1000);

    console.log("Attempting to save user data:", {
      spotify_id,
      display_name,
      email,
      profile_image,
    });

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
        expiryDate.toISOString(),
        profile_image,
      ],
      function (err) {
        if (err) {
          console.error("Error saving user to database", err);
          return res
            .status(500)
            .json({ error: "Failed to save user data", details: err.message });
        }

        console.log("User data saved successfully");

        const token = jwt.sign({ id: spotify_id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.redirect(`${process.env.FRONTEND_URL}/success?token=${token}`);
      }
    );
  } catch (error) {
    console.error(
      "Error in Spotify callback:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Authentication failed", details: error.message });
  }
});

// Protected route to get user data
app.get("/api/user", authenticateToken, (req, res) => {
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

const getSpotifyData = async (endpoint, access_token) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Spotify data from ${endpoint}:`, error);
    throw error;
  }
};

// Route to get current track playing
app.get("/api/current-track", authenticateToken, async (req, res) => {
  try {
    const user = await getUserWithValidToken(req.user.id);
    console.log("User fetched:", user.id);

    const data = await getSpotifyData(
      "/me/player/currently-playing",
      user.spotify_access_token
    );
    console.log("Spotify data fetched:", JSON.stringify(data));

    if (data && data.item) {
      res.json({
        isPlaying: data.is_playing,
        track: data.item.name,
        artist: data.item.artists[0].name,
      });
    } else {
      // If no song is playing, fetch the last listened track
      const lastListened = await db.getAsync(
        "SELECT * FROM last_listened WHERE user_id = ? ORDER BY played_at DESC LIMIT 1",
        [user.id]
      );
      if (lastListened) {
        res.json({
          isPlaying: false,
          track: lastListened.track,
          artist: lastListened.artist,
          lastPlayed: lastListened.played_at,
        });
      } else {
        res.json({ isPlaying: false });
      }
    }
  } catch (error) {
    console.error("Error in /api/current-track:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch current track", details: error.message });
  }
});

// Add a new endpoint for last listened track
app.get("/api/last-listened", authenticateToken, async (req, res) => {
  try {
    const user = await getUserWithValidToken(req.user.id);
    const lastListened = await db.getAsync(
      "SELECT * FROM last_listened WHERE user_id = ? ORDER BY played_at DESC LIMIT 1",
      [user.id]
    );
    if (lastListened) {
      res.json(lastListened);
    } else {
      res.status(404).json({ error: "No last listened track found" });
    }
  } catch (error) {
    console.error("Failed to fetch last listened track:", error);
    res.status(500).json({
      error: "Failed to fetch last listened track",
      details: error.message,
    });
  }
});

// Route to get top Album of the week
app.get("/api/top-album", authenticateToken, async (req, res) => {
  try {
    const user = await getUserWithValidToken(req.user.id);
    console.log("User fetched for top album:", user.id);

    const data = await getSpotifyData(
      "/me/top/tracks?time_range=short_term&limit=50",
      user.spotify_access_token
    );
    console.log("Top album data fetched:", JSON.stringify(data));

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
      await dataManagement.updateUserStats(
        user.id,
        "top_album",
        topAlbum,
        topArtist
      );
      res.json({ album: topAlbum, artist: topArtist });
    } else {
      res.json({ message: "No top album found" });
    }
  } catch (error) {
    console.error("Error fetching top album:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch top album", details: error.message });
  }
});

//Route to get top song of week
app.get("/api/top-track", authenticateToken, async (req, res) => {
  try {
    const user = await getUserWithValidToken(req.user.id);
    console.log("User fetched for top track:", user.id);

    const data = await getSpotifyData(
      "/me/top/tracks?time_range=short_term&limit=1",
      user.spotify_access_token
    );
    console.log("Top track data fetched:", JSON.stringify(data));

    if (data && data.items && data.items.length > 0) {
      await dataManagement.updateUserStats(
        user.id,
        "top_track",
        data.items[0].name,
        data.items[0].artists[0].name
      );
      res.json({
        track: data.items[0].name,
        artist: data.items[0].artists[0].name,
      });
    } else {
      res.json({ message: "No top track found" });
    }
  } catch (error) {
    console.error("Failed to fetch or update top track:", error);
    res.status(500).json({
      error: "Failed to fetch or update top track",
      details: error.message,
    });
  }
});

// Route to get top artist of the week
app.get("/api/top-artist", authenticateToken, async (req, res) => {
  try {
    const user = await getUserWithValidToken(req.user.id);
    console.log("User fetched for top artist:", user.id);

    const data = await getSpotifyData(
      "/me/top/artists?time_range=short_term&limit=1",
      user.spotify_access_token
    );
    console.log("Top artist data fetched:", JSON.stringify(data));

    if (data.items && data.items.length > 0) {
      const topArtist = data.items[0].name;
      await dataManagement.updateUserStats(
        user.id,
        "top_artist",
        topArtist,
        null
      );
      res.json({ artist: topArtist });
    } else {
      res.json({ message: "No top artist found" });
    }
  } catch (error) {
    console.error("Error fetching top artist:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch top artist", details: error.message });
  }
});

//last song listened to enpoint
// app.post("/api/update-last-listened", authenticateToken, async (req, res) => {
//   try {
//     const user = await getUserWithValidToken(req.user.id);
//     const data = await getSpotifyData(
//       "/me/player/recently-played?limit=1",
//       user.spotify_access_token
//     );
//     if (data && data.items && data.items.length > 0) {
//       const track = data.items[0].track;
//       await db.runAsync(
//         `INSERT OR REPLACE INTO last_listened (user_id, track, artist, played_at) VALUES (?, ?, ?, ?)`,
//         [user.id, track.name, track.artists[0].name, data.items[0].played_at]
//       );
//       res.json({ message: "Last listened track updated successfully" });
//     } else {
//       res.status(404).json({ error: "No recently played tracks found" });
//     }
//   } catch (error) {
//     console.error("Failed to update last listened track:", error);
//     res.status(500).json({
//       error: "Failed to update last listened track",
//       details: error.message,
//     });
//   }
// });

// app.get("/api/last-listened", authenticateToken, async (req, res) => {
//   try {
//     const user = await getUserWithValidToken(req.user.id);
//     const lastListened = await db.getAsync(
//       "SELECT * FROM last_listened WHERE user_id = ?",
//       [user.id]
//     );
//     if (lastListened) {
//       res.json(lastListened);
//     } else {
//       res.status(404).json({ error: "No last listened track found" });
//     }
//   } catch (error) {
//     console.error("Failed to fetch last listened track:", error);
//     res.status(500).json({
//       error: "Failed to fetch last listened track",
//       details: error.message,
//     });
//   }
// });

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

async function refreshSpotifyToken(refresh_token) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// Use server.listen instead of app.listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});