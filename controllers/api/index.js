const router = require("express").Router();
const userRoutes = require("./userRoutes");
const medicationRoutes = require("./medicationRoutes");
const sideEffectsRoutes = require("./medicationRoutes");

router.use("/users", userRoutes);
router.use("/profile", medicationRoutes);
router.use("/sideEffects", sideEffectsRoutes);

module.exports = router;
