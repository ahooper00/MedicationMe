const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // Save user id and password
        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

// Login a current user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If the user data (email) doesn't exist in database, throw error message
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, try again.' });
            return;
        }

        const userPassword = await userData.checkPassword(req.body.password);

        // If the user data (password) doesn't exist in database, throw error message
        if (!userPassword) {
            res.status(400).json({ message: 'Incorrect email or password, try again.'});
            return
        }

        // If user data matches what is saved in database, show success message
        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true;

            res.status(200).json({ message: "Successfully logged in!"})
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

// Logout current user
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            req.status(204).end();
        })
    } else {
        req.status(404).end();
    }
});

module.exports = router;