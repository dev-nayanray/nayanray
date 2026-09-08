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
/*  SECURITY: SSL certificate verification prevents MITM attacks.      */
/*  Ideally rejectUnauthorized: true verifies the DB cert against     */
/*  a trusted CA.                                                      */
/*                                                                    */
/*  REALITY: Many hosted Postgres providers (Supabase, Neon, etc.)    */
/*  use self-signed certificate chains that Node.js can't verify      */
/*  against its default trust store. Setting rejectUnauthorized:      */
/*  true causes 'SELF_SIGNED_CERT_IN_CHAIN' errors and the server    */
/*  refuses to start.                                                  */
/*                                                                    */
/*  This config makes the tradeoff explicit:                          */
/*  1. Default: rejectUnauthorized: false (SSL encrypted, but cert     */
/*     not verified). MITM risk exists but connection is encrypted.   */
/*  2. If DB_SSL_CERT is set: rejectUnauthorized: true + custom CA.   */
/*     This is the secure option — download your provider's root     */
/*     cert and set DB_SSL_CERT to the PEM string.                    */
/*                                                                    */
/*  For Supabase: download the root cert from                          */
/*  https://supabase.com/docs/guides/database/connecting-to-postgres  */
/*  and set DB_SSL_CERT to its contents.                               */
/*                                                                    */
/*  In development (localhost DB), SSL is disabled entirely.          */
/* ------------------------------------------------------------------ */
const isProduction = process.env.NODE_ENV === "production";
const useSSL = isProduction || process.env.DB_SSL === "true";

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        // If DB_SSL_CERT is provided, verify the cert against it (secure).
        // Otherwise, encrypt the connection but don't verify (mitigates
        // MITM partially — traffic is still encrypted).
        rejectUnauthorized: !!process.env.DB_SSL_CERT,
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
