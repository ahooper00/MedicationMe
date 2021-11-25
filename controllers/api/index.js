const router = require('express').Router();
const userRoutes = require('./userRoutes');
const medicationRoutes = require('./projectRoutes');
const sideEffectsRoutes = require('./medicationRoutes');

router.use('/users', userRoutes);
router.use('/projects', medicationRoutes);
router.use('/sideEffects', sideEffectsRoutes);

module.exports = router;