const router = require("express").Router();
const { User, Medication, SideEffects } = require("../models");
const withAuth = require("../utils/auth.js");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

//Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const date = new Date().toLocaleDateString(); // MM/DD/YYYY

    console.log("date:", date);
    const userData = await User.findByPk(req.session.user_id, {
      logging: true,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Medication,
          where: {
            fromDate: { [Op.lte]: "12/02/2021" },
            toDate: { [Op.gte]: "12/02/2021" },
          },
          attributes: [
            "id",
            "name",
            "dailySchedule",
            "fromDate",
            "toDate",
            "dosage",
            "comments",
          ],
        },
      ],
    });
    console.log(userData);
    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
