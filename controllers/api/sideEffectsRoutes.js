const router = require('express').Router();
const { SideEffects } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const sideEffectsData = await SideEffects.destroy({
            where: {
                id: req.params.id,
                medication_id: req.session.user_id,
            },
        });

        if (!sideEffectsData) {
            res.status(404).json({ message: 'No side effect found with this id!'})
            return;
        }

        res.status(200).json(sideEffectsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;