import pg from 'pg';

const { Pool } = pg;

let databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const connection = new Pool(databaseConfig);

export { connection };
