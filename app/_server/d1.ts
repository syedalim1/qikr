import fs from 'node:fs';
import path from 'node:path';

// Standard Cloudflare D1 Type Definitions
export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: {
    duration?: number;
    rows_read?: number;
    rows_written?: number;
    last_row_id?: number;
    changes?: number;
  };
  error?: string;
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<null>>;
  raw<T = unknown>(): Promise<T[]>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

let localDbInstance: any = null;
let sqlJsModule: any = null;
let isInitialized = false;

const DB_DIR = path.join(process.cwd(), '.d1');
const DB_FILE = path.join(DB_DIR, 'local.sqlite');

async function getLocalSqliteDb() {
  if (!sqlJsModule) {
    const initSqlJs = require('sql.js');
    sqlJsModule = await initSqlJs();
  }

  if (!localDbInstance) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const fileBuffer = fs.readFileSync(DB_FILE);
      localDbInstance = new sqlJsModule.Database(fileBuffer);
    } else {
      localDbInstance = new sqlJsModule.Database();
    }

    // Run migrations on first setup
    if (!isInitialized) {
      runLocalMigrations(localDbInstance);
      isInitialized = true;
      saveLocalDb();
    }
  }

  return localDbInstance;
}

function saveLocalDb() {
  if (!localDbInstance) return;
  try {
    const data = localDbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.error('Failed to save local sqlite db:', err);
  }
}

function runLocalMigrations(db: any) {
  try {
    const migrationsDir = path.join(process.cwd(), 'migrations');
    if (!fs.existsSync(migrationsDir)) return;

    const files = fs.readdirSync(migrationsDir).sort();
    for (const file of files) {
      if (file.endsWith('.sql')) {
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        db.run(sql);
      }
    }
  } catch (err) {
    console.error('Error running local migrations:', err);
  }
}

/**
 * Creates a D1-compatible adapter wrapping the local SQLite instance.
 */
function createLocalD1Adapter(): D1Database {
  return {
    prepare(query: string): D1PreparedStatement {
      let boundParams: any[] = [];

      const statement: D1PreparedStatement = {
        bind(...values: any[]) {
          boundParams = values;
          return statement;
        },
        async first<T = unknown>(colName?: string): Promise<T | null> {
          const db = await getLocalSqliteDb();
          const stmt = db.prepare(query);
          stmt.bind(boundParams);
          if (stmt.step()) {
            const row = stmt.getAsObject();
            stmt.free();
            if (colName) return (row[colName] as T) ?? null;
            return row as T;
          }
          stmt.free();
          return null;
        },
        async all<T = unknown>(): Promise<D1Result<T>> {
          const db = await getLocalSqliteDb();
          const stmt = db.prepare(query);
          stmt.bind(boundParams);
          const results: T[] = [];
          while (stmt.step()) {
            results.push(stmt.getAsObject() as T);
          }
          stmt.free();
          return {
            results,
            success: true,
            meta: { rows_read: results.length },
          };
        },
        async run(): Promise<D1Result<null>> {
          const db = await getLocalSqliteDb();
          db.run(query, boundParams);
          saveLocalDb();
          return {
            results: [],
            success: true,
            meta: { changes: 1 },
          };
        },
        async raw<T = unknown>(): Promise<T[]> {
          const res = await this.all<T>();
          return res.results;
        },
      };

      return statement;
    },
    async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
      const results: D1Result<T>[] = [];
      for (const stmt of statements) {
        const res = await stmt.all<T>();
        results.push(res);
      }
      saveLocalDb();
      return results;
    },
    async exec(query: string): Promise<{ count: number; duration: number }> {
      const db = await getLocalSqliteDb();
      db.run(query);
      saveLocalDb();
      return { count: 1, duration: 0 };
    },
  };
}

/**
 * Returns the active D1 database.
 * If running on Cloudflare with a bound D1 database, returns the real Cloudflare D1.
 * Otherwise, falls back to the local SQLite D1-compatible adapter.
 */
export function getD1(): D1Database {
  // Check for Cloudflare D1 binding
  if (typeof process !== 'undefined' && (process.env as any)?.DB) {
    return (process.env as any).DB as D1Database;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any)?.DB) {
    return (globalThis as any).DB as D1Database;
  }

  // Fallback to local D1 adapter
  return createLocalD1Adapter();
}
