const router = require("express").Router();
const { User, Medication, SideEffects } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

// router.get("/", async (req, res) => {
//   try {
//     //Get all users and JOIN with user data
//     const dbProfileData = await Medication.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["firstName", "lastName"],
//         },
//       ],
//     });
//     const profile = dbProfileData.map((medication) =>
//       medication.get({ plain: true })
//     );

//     res.render("homepage", {
//       profile,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/profile/:id", async (req, res) => {
//   try {
//     const profileData = await User.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["firstName", "lastName"],
//         },
//       ],
//     });

//     const profile = profileData.get({ plain: true });

//     res.render("homepage", {
//       ...profile,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Medication }],
      // include: [{ model: SideEffects }],
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
