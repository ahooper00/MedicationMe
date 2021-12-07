const router = require("express").Router();
const { User, Medication, SideEffects } = require("../models");
const withAuth = require("../utils/auth.js");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const date = new Date();

    const medications = await Medication.findAll({
      logging: true,
      attributes: { exclude: ["password"] },
      where: {
        user_id: req.session.user_id
      }
    });

    if (medications.length) {
      const currentMedicationQuery = await Medication.findAll({
        where: {
          user_id: req.session.user_id,
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
      });

      const currentMeds = currentMedicationQuery.map((result) => result.toJSON());

      const upcomingMedicationQuery = await Medication.findAll({
        where: {
          toDate: { [Op.gte]: date },
        }
      });

      const upcomingMeds = upcomingMedicationQuery.map((result) => result.toJSON());

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
        datesIncluded: currentMeds,
        datesUpcoming: upcomingMeds,
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
  // if (req.session.logged_in) {
  //   res.redirect("/profile");
  //   return;
  // }
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
