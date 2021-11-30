const router = require('express').Router();
const { SideEffects, Medication } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all side effects
router.get('/', async (req, res) => {
  // Find all side effects
  try {
    const getSideEffects = await SideEffects.findAll({
      include: {
        model: Medication,
        attributes: ['name']
      }
    });
    res.status(200).json(getSideEffects)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one medication
router.get('/:id', async (req, res) => {
  // Find one side effect by its 'id'
  try {
    const findOneSideEffect = await SideEffects.findByPk(req.params.id, {
      include: [{ model: Medication }]
    });
    if (!findOneSideEffect) {
      res.status(400).json({ message: 'No side effect found with that id' })
      return
    }
    res.status(200).json(findOneSideEffect)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Add a new side effect
router.post('/', withAuth, async (req, res) => {
  try {
    const newSideEffect = await SideEffects.create({
      ...req.body,
      medication_id: req.session.medication_id,
    });

    res.status(200).json(newSideEffect);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a side effect
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateSideEffect = await SideEffects.update(
      {
        description: req.session.description,
      },
      {
        where: {
          id: req.params.id,
        },
      });

    if (!updateSideEffect) {
      res.status(400).json({ message: 'No side effect found with that id' })
      return
    }
    res.status(200).json(updateSideEffect);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a side effect
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const sideEffectsData = await SideEffects.destroy({
      where: {
        id: req.params.id,
        medication_id: req.session.user_id,
      },
    });

    if (!sideEffectsData) {
      res.status(404).json({ message: 'No side effect found with this id!' })
      return;
    }

    res.status(200).json(sideEffectsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;