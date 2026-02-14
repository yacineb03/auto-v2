export default defineNitroPlugin((nitroApp) => {
  const db = useDb();

  console.log('--- INITIALIZING DATABASE SCHEMA ---');

  // Create Users table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rank INTEGER DEFAULT 1,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Ensure demo users exist
  console.log('--- SYNCING DEMO USERS ---');
  const insertUser = db.prepare('INSERT OR IGNORE INTO users (firstname, lastname, email, password, rank) VALUES (?, ?, ?, ?, ?)');
  insertUser.run('Admin', 'Elite', 'admin@driveflow.fr', 'password', 3);
  insertUser.run('Marc', 'Moniteur', 'moniteur@driveflow.fr', 'password', 2);
  insertUser.run('Élève', 'Démo', 'eleve@driveflow.fr', 'password', 1);

  // Create other tables as per README (schools, lessons, payments, messages, notifications)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      contact TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      instructor_id INTEGER,
      start_time DATETIME,
      end_time DATETIME,
      status TEXT DEFAULT 'planned',
      type TEXT,
      comment TEXT,
      FOREIGN KEY(student_id) REFERENCES users(id),
      FOREIGN KEY(instructor_id) REFERENCES users(id)
    )
  `).run();

  console.log('--- DATABASE READY ---');
});
