const router = require("express").Router();
const apiRoutes = require("./api");
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

module.exports = router;
