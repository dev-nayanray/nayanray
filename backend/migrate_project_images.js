// One-off migration: Projects.image (single URL) -> Projects.images (JSON array).
// Safe to run multiple times and safe on a fresh DB where the table/column
// don't exist yet (sequelize.sync() will just create the new schema there).
import { DataTypes } from "sequelize";
import { sequelize } from "./models/index.js";

const TABLE = "Projects";

const columnExists = async (table, column) => {
  const [rows] = await sequelize.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name = :table AND column_name = :column`,
    { replacements: { table, column } }
  );
  return rows.length > 0;
};

const tableExists = async (table) => {
  const [rows] = await sequelize.query(
    `SELECT table_name FROM information_schema.tables WHERE table_name = :table`,
    { replacements: { table } }
  );
  return rows.length > 0;
};

const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    if (!(await tableExists(TABLE))) {
      console.log(`"${TABLE}" table does not exist yet — nothing to migrate, sync() will create it fresh.`);
      return;
    }

    const hasImages = await columnExists(TABLE, "images");
    const hasImage = await columnExists(TABLE, "image");

    if (!hasImages) {
      console.log('Adding "images" column...');
      await sequelize.getQueryInterface().addColumn(TABLE, "images", {
        type: DataTypes.JSON,
        allowNull: true,
      });
    }

    if (hasImage) {
      console.log('Backfilling "images" from "image" for rows missing it...');
      const [result] = await sequelize.query(
        `UPDATE "${TABLE}" SET images = json_build_array(image) WHERE images IS NULL AND image IS NOT NULL`
      );
      console.log("Backfill result:", result);

      console.log('Dropping legacy "image" column...');
      await sequelize.getQueryInterface().removeColumn(TABLE, "image");
    }

    console.log('Enforcing NOT NULL on "images"...');
    await sequelize.query(`ALTER TABLE "${TABLE}" ALTER COLUMN images SET NOT NULL`);

    console.log("Migration complete.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

migrate();
