const router = require('express').Router();
const { Medication, SideEffects } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all medication
router.get('/', async (req, res) => {
  // Find all medications
  try {
    const getMedication = await Medication.findAll({
      include: {
        model: SideEffects,
        attributes: ['description']
      }
    });
    res.status(200).json(getMedication)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one medication
router.get('/:id', async (req, res) => {
  // Find one medication by its 'id'
  try {
    const findOneMedication = await Medication.findByPk(req.params.id, {
      include: [{ model: SideEffects }]
    });
    if (!findOneMedication) {
      res.status(400).json({ message: 'No medication found with that id' })
      return
    }
    res.status(200).json(findOneMedication)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newMedication = await Medication.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMedication);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const medicationData = await Medication.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!medicationData) {
      res.status(404).json({ message: 'No medication found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;