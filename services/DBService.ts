import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  // Checkeo que version de la base de datos tengo
  const res = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  const currentDbVersion = res?.user_version || 0;

  // Si la version es mayor o igual a la version de la base de datos, no hace falta migrar
  // Si la version es menor, se hace la migracion
  if (currentDbVersion >= DATABASE_VERSION) return;

  if (currentDbVersion === 0) {
    console.log("Migrando base de datos...");
    // Si la version es 0, significa que no hay base de datos creada
    // Se crea la base de datos

    // PRAGMA journal_mode = 'wal'; lo que hace es activar el modo WAL (Write Ahead Logging)
    // Tip: Enable WAL journal mode when you create a new database to improve performance in general.

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        dueDate TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // Guardo la version de la base de datos
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
};
