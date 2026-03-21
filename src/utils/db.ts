// src/utils/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('lehwitok.db');

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      role TEXT,
      avatarUri TEXT
    );
  `);
};

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
  return result || { fullName: 'Abdulai Samuel', email: 'samuel.abdulai@example.com', role: 'Student', avatarUri: null };
};
