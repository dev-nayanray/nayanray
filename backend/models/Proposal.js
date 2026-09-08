import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const BUDGET_RANGES = ["Under $1k", "$1k–5k", "$5k–15k", "$15k+", "Not sure yet"];
export const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];
export const PROPOSAL_STATUSES = ["new", "reviewed", "in_discussion", "accepted", "declined"];

const Proposal = sequelize.define(
  "Proposal",
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Services",
        key: "id",
      },
    },
    // Snapshot of the service title at submission time, so the proposal stays
    // meaningful even if the service is later renamed or deleted.
    serviceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    budgetRange: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [BUDGET_RANGES],
      },
    },
    timeline: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [TIMELINES],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "new",
      validate: {
        isIn: [PROPOSAL_STATUSES],
      },
    },
  },
  {
    // Indexes — speed up the queries the admin dashboard actually runs:
    //   WHERE status = 'new' ORDER BY createdAt DESC
    // Without this index, the DB does a full table scan on every admin visit.
    indexes: [
      { fields: ["status"] },
      { fields: ["createdAt"] },
      { fields: ["email"] },
    ],
  }
);

export default Proposal;
