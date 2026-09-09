import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

/* ------------------------------------------------------------------ */
/*  License model — stores premium plugin license keys                 */
/*                                                                    */
/*  The premium plugin calls:                                         */
/*  - POST /api/license/activate   → activates a key on a site        */
/*  - POST /api/license/deactivate → deactivates a key on a site      */
/*  - GET  /api/license/verify     → checks if a key is valid          */
/*                                                                    */
/*  Each license has a max number of activations (sites).             */
/*  Each activation records the site URL + a unique activation ID.    */
/* ------------------------------------------------------------------ */

const License = sequelize.define(
  "License",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    licenseKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "business",
      validate: {
        isIn: [["personal", "business", "agency"]],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
      validate: {
        isIn: [["active", "expired", "suspended", "refunded"]],
      },
    },
    maxActivations: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    // JSON array of { site, activationId, activatedOn }
    activations: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    pricePaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    billingCycle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["monthly", "yearly"]],
      },
    },
    purchasedOn: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    expiresOn: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    indexes: [
      { fields: ["licenseKey"] },
      { fields: ["email"] },
      { fields: ["status"] },
    ],
  }
);

export default License;
