let db;

function setDb(database) {
  db = database;
}

async function updateUserStats(userId, statType, statValue, artist) {
  const query = `INSERT INTO user_stats (user_id, stat_type, stat_value, artist) 
                 VALUES (?, ?, ?, ?)`;
  try {
    await db.runAsync(query, [userId, statType, statValue, artist]);
    console.log(`Updated ${statType} for user ${userId}`);
  } catch (error) {
    console.error(`Error updating ${statType} for user ${userId}:`, error);
  }
}

async function updateLastListened(userId, track, artist) {
  const query = `INSERT OR REPLACE INTO last_listened (user_id, track, artist, played_at) 
                 VALUES (?, ?, ?, datetime('now'))`;
  try {
    await db.runAsync(query, [userId, track, artist]);
    console.log(`Updated last listened for user ${userId}`);
  } catch (error) {
    console.error(`Error updating last listened for user ${userId}:`, error);
  }
}

async function getLastListened(userId) {
  const query = `SELECT * FROM last_listened WHERE user_id = ?`;
  try {
    return await db.getAsync(query, [userId]);
  } catch (error) {
    console.error(`Error getting last listened for user ${userId}:`, error);
    return null;
  }
}

async function getUserStats(userId, statType) {
  const query = `SELECT * FROM user_stats WHERE user_id = ? AND stat_type = ? 
                 ORDER BY timestamp DESC LIMIT 1`;
  try {
    return await db.getAsync(query, [userId, statType]);
  } catch (error) {
    console.error(`Error getting ${statType} for user ${userId}:`, error);
    return null;
  }
}

module.exports = {
  setDb,
  updateUserStats,
  updateLastListened,
  getLastListened,
  getUserStats,
};

module.exports.setDb = setDb;