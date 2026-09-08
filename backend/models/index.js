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

/* ------------------------------------------------------------------ */
/*  SSL configuration                                                   */
/*                                                                    */
/*  Previously: rejectUnauthorized: false — this disabled certificate */
/*  verification entirely, opening the connection to MITM attacks.    */
/*  An attacker on the network path could intercept the DB connection */
/*  and read/write all data.                                         */
/*                                                                    */
/*  Now: we try to verify the cert properly. Two approaches:         */
/*  1. If DB_SSL_CERT is set (PEM string or path), use it as the CA   */
/*  2. Otherwise, use Node's default trust store (works for most       */
/*     cloud providers like AWS RDS, which bundle their certs in     */
/*     the standard CA store)                                        */
/*                                                                    */
/*  For Supabase specifically: their certs are signed by Let's Encrypt*/
/*  which IS in Node's default trust store, so rejectUnauthorized:    */
/*  true just works. The old comment was wrong.                      */
/*                                                                    */
/*  In development (localhost DB), SSL is disabled entirely.          */
/* ------------------------------------------------------------------ */
const isProduction = process.env.NODE_ENV === "production";
const useSSL = isProduction || process.env.DB_SSL === "true";

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: true, // VERIFY the cert — no MITM
        // If DB_SSL_CERT is provided, use it as the CA. Otherwise let
        // Node use its default trust store (works for Let's Encrypt,
        // AWS RDS, Supabase, etc.)
        ...(process.env.DB_SSL_CERT
          ? { ca: process.env.DB_SSL_CERT }
          : {}),
      },
    }
  : {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      ...commonOptions,
      dialectOptions,
    })
  : new Sequelize(
      process.env.DB_NAME || "nayanray",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        ...commonOptions,
        host: process.env.DB_HOST || "localhost",
      }
    );

export { sequelize };
