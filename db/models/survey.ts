import { client } from '../local'

export async function createSuveryTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS survey (
      id serial PRIMARY KEY,
      type varchar(50) NOT NULL,
      name varchar(50) NOT NULL,
      count int DEFAULT 0,
      record text[][],
      status int DEFAULT 0,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createSuveryTable Success.')
  } catch(e) {
    console.log('[DB] createSuveryTable Error: ' + e.message)
    return false
  }
}
