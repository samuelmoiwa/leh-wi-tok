// src/utils/db.ts
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("lehwitok.db");

export const initDatabase = () => {
  // User profile table
  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      role TEXT,
      avatarUri TEXT
    );
  `);

  // Dictionary table
  db.execSync(`
    CREATE TABLE IF NOT EXISTS dictionary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT UNIQUE,
      definition TEXT,
      category TEXT,
      illustrationUri TEXT,
      gestureUri TEXT
    );
  `);

  // NEW: Progress tracking table
  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT UNIQUE,
      totalLessons INTEGER DEFAULT 0,
      completedLessons INTEGER DEFAULT 0,
      completedNuggets TEXT DEFAULT '[]',   -- JSON array of nugget IDs
      lastUpdated TEXT
    );
  `);

  // Pre-populate sample progress data (only once)
  const progressCount = (db.getFirstSync("SELECT COUNT(*) as count FROM user_progress") as { count: number })?.count || 0;
  if (progressCount === 0) {
    db.runSync(`
      INSERT INTO user_progress (level, totalLessons, completedLessons, completedNuggets, lastUpdated) VALUES
      ('Beginner', 12, 8, '["1","2","3","5","7","9","10","12"]', '2026-03-21'),
      ('Basic', 15, 5, '["13","14","16"]', '2026-03-21'),
      ('Intermediate', 10, 2, '[]', '2026-03-21'),
      ('Advanced', 8, 0, '[]', '2026-03-21');
    `);
  }

  // Pre-populate dictionary (your existing code)
  const dictCount = (db.getFirstSync("SELECT COUNT(*) as count FROM dictionary") as { count: number })?.count || 0;
  if (dictCount === 0) {
    db.runSync(`
      INSERT INTO dictionary (word, definition, category, illustrationUri) VALUES
      ('Hello', 'A common greeting sign', 'Greetings', 'https://picsum.photos/id/1015/300/300'),
      ('Thank You', 'Expression of gratitude', 'Greetings', 'https://picsum.photos/id/102/300/300'),
      ('Cat', 'A small domestic animal', 'Animals', 'https://picsum.photos/id/237/300/300'),
      ('Rice', 'A staple food in Sierra Leone', 'Food', 'https://picsum.photos/id/1080/300/300'),
      ('Red', 'The color of passion', 'Colors', 'https://picsum.photos/id/101/300/300');
    `);
  }
};

// Keep your existing functions
export const saveProfile = (fullName: string, email: string, role: string, avatarUri: string | null) => {
  db.runSync(
    `INSERT OR REPLACE INTO user_profile (id, fullName, email, role, avatarUri) VALUES (1, ?, ?, ?, ?)`,
    [fullName, email, role, avatarUri]
  );
};

export const getProfile = () => {
  const result = db.getFirstSync(`
    SELECT fullName, email, role, avatarUri FROM user_profile WHERE id = 1
  `);
  return result || { fullName: "Abdulai Samuel", email: "samuel.abdulai@example.com", role: "Student", avatarUri: null };
};

// Dictionary functions (unchanged)
export const addWord = (word: string, definition: string, category: string, illustrationUri: string | null) => {
  db.runSync(`INSERT INTO dictionary (word, definition, category, illustrationUri) VALUES (?, ?, ?, ?)`, [word, definition, category, illustrationUri]);
};

export const deleteWord = (id: number) => {
  db.runSync(`DELETE FROM dictionary WHERE id = ?`, [id]);
};

export const getAllWords = () => db.getAllSync(`SELECT * FROM dictionary ORDER BY word ASC`);
export const searchWords = (query: string) => db.getAllSync(`SELECT * FROM dictionary WHERE word LIKE ? OR definition LIKE ? ORDER BY word ASC`, [`%${query}%`, `%${query}%`]);

// === NEW PROGRESS FUNCTIONS ===
export const getAllProgress = () => {
  return db.getAllSync(`SELECT * FROM user_progress ORDER BY level ASC`);
};

export const updateLevelProgress = (level: string, completedLessons: number, completedNuggets: string[]) => {
  db.runSync(`
    INSERT OR REPLACE INTO user_progress (level, totalLessons, completedLessons, completedNuggets, lastUpdated)
    VALUES (?,
      (SELECT totalLessons FROM user_progress WHERE level = ?),
      ?,
      ?,
      datetime('now')
    )
  `, [level, level, completedLessons, JSON.stringify(completedNuggets)]);
};
