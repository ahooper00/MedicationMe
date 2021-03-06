const router = require("express").Router();
const { Medication, SideEffects, User } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const getMedication = await Medication.findAll({
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
    res.status(200).json(getMedication);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:user_id", withAuth, async (req, res) => {
  try {
    const getMedicationByUser = await Medication.findAll(req.params.user_id, {
      include: [{ model: User }],
    });
    if (!getMedicationByUser) {
      res.status(400).json({ message: "No Data Found" });
      return;
    }
    res.status(200).json(getMedicationByUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const findOneMedication = await Medication.findByPk(req.params.id, {
      include: [{ model: SideEffects }],
    });
    if (!findOneMedication) {
      res.status(400).json({ message: "No medication found with that id" });
      return;
    }
    res.status(200).json(findOneMedication);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newMedication = await Medication.create({
      name: req.body.name,
      dailySchedule: req.body.dailySchedule,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      dosage: req.body.dosage,
      comments: req.body.comments,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMedication);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateMedication = await Medication.update(
      {
        name: req.body.name,
        dailySchedule: req.body.dailySchedule,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        dosage: req.body.dosage,
        comments: req.body.comments,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updateMedication) {
      res.status(400).json({ message: "No medication found with that id" });
      return;
    }
    res.status(200).json(updateMedication);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const medicationData = await Medication.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!medicationData) {
      res.status(404).json({ message: "No medication found with this id!" });
      return;
    }

    res.status(200).json(medicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
