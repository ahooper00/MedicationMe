const Medication = require('./Medication');
const User = require('./User');
const SideEffects = require('./SideEffects');

User.hasMany(Medication, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Medication.belongsTo(User, {
    foreignKey: 'user_id',
});

Medication.hasMany(SideEffects, {
    foreignKey: 'medication_id',
});

SideEffects.belongsTo(Medication, {
    foreignKey: 'medication_id',
});

module.exports = { User, Medication, SideEffects };