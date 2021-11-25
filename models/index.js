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

Medication.hasMany(Side_effects, {
    foreignKey: 'medication_id',
});

SideEffects.belongsToMany(Medication, {
    foreignKey: 'medication_id', // do I need a 'through:' section for this part?
});

module.exports = { User, Medication, SideEffects };