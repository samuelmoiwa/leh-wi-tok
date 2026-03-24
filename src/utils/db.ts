import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("lehwitok.db");

export const initDatabase = () => {
  // User profile table (your existing one)
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

  // Pre-populate some sample words (only once)
  const count =
    (
      db.getFirstSync("SELECT COUNT(*) as count FROM dictionary") as {
        count: number;
      }
    )?.count || 0;
  if (count === 0) {
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

export const saveProfile = (
  fullName: string,
  email: string,
  role: string,
  avatarUri: string | null,
) => {
  db.runSync(
    `INSERT OR REPLACE INTO user_profile (id, fullName, email, role, avatarUri) VALUES (1, ?, ?, ?, ?)`,
    [fullName, email, role, avatarUri],
  );
};

export const getProfile = () => {
  const result = db.getFirstSync(`
    SELECT fullName, email, role, avatarUri FROM user_profile WHERE id = 1
  `);
  return (
    result || {
      fullName: "Abdulai Samuel",
      email: "samuel.abdulai@example.com",
      role: "Student",
      avatarUri: null,
    }
  );
};

// === DICTIONARY FUNCTIONS ===
export const addWord = (
  word: string,
  definition: string,
  category: string,
  illustrationUri: string | null,
) => {
  db.runSync(
    `INSERT INTO dictionary (word, definition, category, illustrationUri) VALUES (?, ?, ?, ?)`,
    [word, definition, category, illustrationUri],
  );
};

export const deleteWord = (id: number) => {
  db.runSync(`DELETE FROM dictionary WHERE id = ?`, [id]);
};

export const getAllWords = () => {
  return db.getAllSync(`
    SELECT id, word, definition, category, illustrationUri
    FROM dictionary
    ORDER BY word ASC
  `);
};

export const searchWords = (query: string) => {
  return db.getAllSync(
    `
    SELECT id, word, definition, category, illustrationUri
    FROM dictionary
    WHERE word LIKE ? OR definition LIKE ?
    ORDER BY word ASC
  `,
    [`%${query}%`, `%${query}%`],
  );
};
