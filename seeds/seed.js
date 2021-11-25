const sequelize = require('../config/connection');
const { User, Medication, SideEffects } = require('../models');

const userData = require('./userData.json');
const medicationData = require('./medicationData.json');
const sideEffectsData = require('./sideEffectsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const medication of medicationData) {
        await Medication.create({
            ...medication,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();