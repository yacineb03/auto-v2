export default defineNitroPlugin(async (nitroApp) => {
  const db = useDb();

  console.log('--- INITIALIZING DATABASE SCHEMA (TURSO/LIBSQL) ---');

  try {
    // Create Users table
    await db.execute(`
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
        `);

    // Check if demo users exist
    const result = await db.execute('SELECT COUNT(*) as count FROM users');
    const count = result.rows[0].count;

    if (count === 0) {
      console.log('--- INSERTING DEMO USERS ---');
      await db.execute({
        sql: 'INSERT INTO users (firstname, lastname, email, password, rank) VALUES (?, ?, ?, ?, ?)',
        args: ['Admin', 'Elite', 'admin@driveflow.fr', 'password', 3]
      });
      await db.execute({
        sql: 'INSERT INTO users (firstname, lastname, email, password, rank) VALUES (?, ?, ?, ?, ?)',
        args: ['Marc', 'Moniteur', 'moniteur@driveflow.fr', 'password', 2]
      });
      await db.execute({
        sql: 'INSERT INTO users (firstname, lastname, email, password, rank) VALUES (?, ?, ?, ?, ?)',
        args: ['Élève', 'Démo', 'eleve@driveflow.fr', 'password', 1]
      });
    }

    // Create other tables
    await db.execute(`
            CREATE TABLE IF NOT EXISTS schools (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              address TEXT,
              contact TEXT
            )
        `);

    await db.execute(`
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
        `);

    console.log('--- DATABASE READY ---');
  } catch (e) {
    console.error('--- DATABASE INITIALIZATION ERROR ---', e);
  }
});
