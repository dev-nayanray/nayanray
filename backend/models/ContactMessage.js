import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const ContactMessage = sequelize.define(
  "ContactMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Indexes — admin sorts by createdAt DESC on every visit.
    // Without this, the DB does a full table scan + sort on every load.
    indexes: [{ fields: ["createdAt"] }, { fields: ["email"] }],
  }
);

export default ContactMessage;
