const router = require("express").Router();
const { User, Medication, SideEffects } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  // Find all medications
  try {
    const getUser = await User.findAll({
      include: [Medication, SideEffects],
    });
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one user
router.get("/:id", async (req, res) => {
  // Find one user by its 'id'
  try {
    const findOneUser = await User.findByPk(req.params.id, {
      include: [Medication, SideEffects],
    });
    if (!findOneUser) {
      res.status(400).json({ message: "No user found with that id" });
      return;
    }
    res.status(200).json(findOneUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    console.log("here");
    const { dateOfBirth, email, firstName, gender, lastName, password } =
      req.body;
    // validate thev values in req.body are valid

    if (
      !dateOfBirth ||
      !email ||
      !firstName ||
      !gender ||
      !lastName ||
      !password
    ) {
      res.status(400).json({ message: "Invalid data send" });
      return;
    }

    const userData = await User.create({ ...req.body });

    // Save user id and password
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login a current user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    // If the user data (email) doesn't exist in database, throw error message
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, try again." });
      return;
    }
    console.log("here");
    const userPassword = await userData.checkPassword(req.body.password);

    // If the user data (password) doesn't exist in database, throw error message
    if (!userPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, try again." });
      return;
    }

    // If user data matches what is saved in database, show success message
    req.session.save(() => {
      (req.session.user_id = userData.id), (req.session.logged_in = true);

      res.status(200).json({ message: "Successfully logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout current user
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      req.status(204).end();
    });
  } else {
    req.status(404).end();
  }
});

module.exports = router;
