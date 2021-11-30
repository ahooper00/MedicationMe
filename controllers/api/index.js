const router = require("express").Router();
const userRoutes = require("./userRoutes");
const medicationRoutes = require("./medicationRoutes");
const sideEffectsRoutes = require("./sideEffectsRoutes");

router.use("/users", userRoutes);
router.use("/medication", medicationRoutes);
router.use("/sideEffects", sideEffectsRoutes);

module.exports = router;
