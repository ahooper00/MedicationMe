const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Medication extends Model { }

Medication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        example_brand: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        dateRange: {
            type: DataTypes.STRING,
        },
        dosage: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'medication',
    }
);

module.exports = Medication;

// date range
// dosage
