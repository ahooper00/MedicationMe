const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Side_effects extends Model { }

Side_effects.init(
    {
        id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING,
        },
        medication_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'medication',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'side_effects',
    }
);

module.exports = Side_effects;