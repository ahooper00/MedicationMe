const User = require('./Medication');
const Medication = require('./User');
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

SideEffects.hasMany(Medication, {
    foreignKey: 'medication_id',
});

module.exports = { User, Medication, SideEffects };