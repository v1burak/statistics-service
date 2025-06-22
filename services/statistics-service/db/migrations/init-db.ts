import 'dotenv/config';
import { Pool } from 'pg';
import { config } from '../../src/config/environment';

const pool = new Pool({
  connectionString: config.databaseUrl
});

const createTable = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS statistics (
        autoId VARCHAR(64) PRIMARY KEY,
        page_views INT DEFAULT 0,
        phone_views INT DEFAULT 0
      );
    `);
    console.log('Table "statistics" created or already exists.');
  } catch (err) {
    console.error('Error creating table', err);
  } finally {
    client.release();
  }
};

createTable().then(() => pool.end());