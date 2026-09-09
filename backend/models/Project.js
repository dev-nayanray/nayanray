import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const Project = sequelize.define("Project", {
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
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isValidImageList(value) {
        if (!Array.isArray(value) || value.length === 0 || value.length > 8) {
          throw new Error("images must be an array of 1 to 8 URLs");
        }
      },
    },
  },
  liveLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  githubLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  technologies: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gradient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Project;
