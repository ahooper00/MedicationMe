const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SideEffects extends Model {}

SideEffects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
    },
    medication_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "medication",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "sideEffects",
  }
);

module.exports = SideEffects;
