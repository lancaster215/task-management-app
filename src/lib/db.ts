import { Pool } from "pg";

declare global {
  // allow attaching pgPool to globalThis in Node and browsers during dev
  var pgPool: Pool | undefined;
}

if (!globalThis.pgPool) {
  globalThis.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

const pool = globalThis.pgPool!;

export default pool;
