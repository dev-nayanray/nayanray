import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Service;
