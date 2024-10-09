const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const db = new sqlite3.Database("./bioTunes.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to the SQLite database.");
    db.serialize(() => {
      // Create the 'users' table
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          display_name TEXT,
          email TEXT,
          spotify_id TEXT,
          instagram_id TEXT,
          spotify_access_token TEXT,
          spotify_refresh_token TEXT,
          token_expiry DATETIME
        )`,
        (err) => {
          if (err) {
            console.error("Error creating users table", err);
          } else {
            console.log("Users table created or already exists.");
          }
        }
      );

      // Create the 'user_stats' table
      db.run(
        `CREATE TABLE IF NOT EXISTS user_stats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT,
          stat_type TEXT,
          stat_value TEXT,
          artist TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        (err) => {
          if (err) {
            console.error("Error creating user_stats table", err);
          } else {
            console.log("User_stats table created or already exists.");

            // Add indices to 'user_stats' table
            db.run(
              "CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats (user_id)"
            );
            db.run(
              "CREATE INDEX IF NOT EXISTS idx_user_stats_timestamp ON user_stats (timestamp)"
            );
          }
        }
      );

      // Create the 'last_listened' table
      db.run(
        `CREATE TABLE IF NOT EXISTS last_listened (
          user_id TEXT PRIMARY KEY,
          track TEXT,
          artist TEXT,
          played_at DATETIME,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        (err) => {
          if (err) {
            console.error("Error creating last_listened table", err);
          } else {
            console.log("Last_listened table created or already exists.");
          }
        }
      );

      // Run migrations
      migrateDatabase();
    });
  }
});

// Promisify database methods
db.runAsync = promisify(db.run).bind(db);
db.getAsync = promisify(db.get).bind(db);

async function migrateDatabase() {
  const migrations = [
    "ALTER TABLE users ADD COLUMN spotify_access_token TEXT",
    "ALTER TABLE users ADD COLUMN spotify_refresh_token TEXT",
    "ALTER TABLE users ADD COLUMN token_expiry DATETIME",
    "ALTER TABLE users ADD COLUMN profile_image TEXT",
  ];

  for (const migration of migrations) {
    try {
      await db.runAsync(migration);
      console.log(`Migration successful: ${migration}`);
    } catch (err) {
      if (err.message.includes("duplicate column name")) {
        console.log(`Column already exists: ${migration}`);
      } else {
        console.error(`Migration failed: ${migration}`, err);
      }
    }
  }
}


// Add this function to your db.js file
function cleanupOldData() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  db.run(`DELETE FROM user_stats WHERE timestamp < ?`, [oneWeekAgo], (err) => {
    if (err) {
      console.error('Error cleaning up old data:', err);
    } else {
      console.log('Old data cleaned up successfully');
    }
  });
}

// Run cleanup daily
setInterval(cleanupOldData, 24 * 60 * 60 * 1000); // Every 24 hours

// Make sure this is at the end of your db.js file
module.exports = db;
