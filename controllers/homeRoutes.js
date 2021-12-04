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

// //Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     const date = new Date().toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });

//     const checkUserDates = await User.findByPk(req.session.user_id, {
//       logging: true,
//       attributes: { exclude: ["password"] },
//       include: [
//         {
//           model: Medication,
//           attributes: ["fromDate", "toDate"],
//         },
//       ],
//     });
//     const UserDateData = checkUserDates.get({ plain: true });
//     console.log(UserDateData);

//     // Return all medications where today's date falls between the from and to date inclusively
//     const userData = await User.findByPk(req.session.user_id, {
//       logging: true,
//       attributes: { exclude: ["password"] },
//       include: [
//         {
//           model: Medication,
//           where: {
//             fromDate: { [Op.lte]: date },
//             toDate: { [Op.gte]: date },
//           },
//           attributes: [
//             "id",
//             "name",
//             "dailySchedule",
//             "fromDate",
//             "toDate",
//             "dosage",
//             "comments",
//           ],
//         },
//       ],
//     });

//     if (!userData) {
//       res.render("profile");
//     }

//     const currentMeds = userData.get({ plain: true });
//     console.log(currentMeds);

//     // Return all the medications where the toDate is future dated including today's date
//     const userData2 = await User.findByPk(req.session.user_id, {
//       logging: true,
//       attributes: { exclude: ["password"] },
//       include: [
//         {
//           model: Medication,
//           where: {
//             toDate: { [Op.gte]: date },
//           },
//           attributes: [
//             "id",
//             "name",
//             "dailySchedule",
//             "fromDate",
//             "toDate",
//             "dosage",
//             "comments",
//           ],
//         },
//       ],
//     });

//     const upcomingMeds = userData2.get({ plain: true });

//     const users = await User.findByPk(req.session.user_id, {
//       logging: true,
//       attributes: { exclude: ["password"] },
//       include: [
//         {
//           model: Medication,
//           attributes: [
//             "id",
//             "name",
//             "dailySchedule",
//             "fromDate",
//             "toDate",
//             "dosage",
//             "comments",
//           ],
//         },
//       ],
//     });

//     const user = users.get({ plain: true });

//     const data = {
//       ...user,
//       datesIncluded: currentMeds.medications,
//       datesUpcoming: upcomingMeds.medications,
//       logged_in: true,
//     };

//     res.render("profile", data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/profile", withAuth, async (req, res) => {
  try {
    const date = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // To check if dates exist
    const checkUserDates = await User.findByPk(req.session.user_id, {
      logging: true,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Medication,
          attributes: ["fromDate", "toDate"],
        },
      ],
    });
    const userDateData = checkUserDates.get({ plain: true });
    console.log("date details", userDateData.medications.length);

    if (userDateData.medications.length) {
      // Return all medications where today's date falls between the from and to date inclusively
      const userData = await User.findByPk(req.session.user_id, {
        logging: true,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Medication,
            where: {
              fromDate: { [Op.lte]: date },
              toDate: { [Op.gte]: date },
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
      const currentMeds = userData.get({ plain: true });
      console.log(currentMeds);

      // Return all the medications where the toDate is future dated including today's date
      const userData2 = await User.findByPk(req.session.user_id, {
        logging: true,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Medication,
            where: {
              toDate: { [Op.gte]: date },
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

      const upcomingMeds = userData2.get({ plain: true });

      const users = await User.findByPk(req.session.user_id, {
        logging: true,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Medication,
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

      const user = users.get({ plain: true });

      const data = {
        ...user,
        datesIncluded: currentMeds.medications,
        datesUpcoming: upcomingMeds.medications,
        logged_in: true,
      };

      res.render("profile", data);
    } else {
      const users = await User.findByPk(req.session.user_id, {
        logging: true,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Medication,
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

      const user = users.get({ plain: true });

      const data = {
        ...user,
        logged_in: true,
      };

      res.render("profile", data);
    }
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
