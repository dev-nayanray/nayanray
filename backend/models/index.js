import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const commonOptions = {
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Supabase (and most hosted Postgres) require SSL, but the cert isn't
// in Node's default trust store, so verification must be disabled.
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      ...commonOptions,
      dialectOptions,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...commonOptions,
        host: process.env.DB_HOST,
      }
    );

export { sequelize };
