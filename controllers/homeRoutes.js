const router = require("express").Router();
const { User, Medication, SideEffects } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", async (req, res) => {
  try {
    //Get all users and JOIN with user data
    const dbUserData = await User.findAll({
      include: [
        {
          model: Medication,
          attributes: [
            "id",
            "name",
            "example_brand",
            "description",
            "dateRange",
            "dosage",
            "user_id",
          ],
        },
      ],
      include: [
        {
          model: SideEffects,
          attributes: ["id", "description", "medication_id"],
        },
      ],
    });
    const users = dbUserData.map((user) => user.get({ plain: true }));

    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Medication,
          attributes: [
            "id",
            "name",
            "example_brand",
            "description",
            "dateRange",
            "dosage",
            "user_id",
          ],
        },
      ],
      include: [
        {
          model: SideEffects,
          attributes: ["id", "description", "medication_id"],
        },
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render("homepage", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Medication }],
      include: [{ model: SideEffects }],
    });
    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
}); //

module.exports = router;
