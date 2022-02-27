const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Register
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. destructure req.body(name, email, password)
    const { name, email, password } = req.body;
    // 2. check if user exists (if yes = throw error)
    const user = await pool.query("SELECT * from users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists!");
    }
    // 3. Bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // 4. insert user to database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_admin) VALUES ($1, $2, $3, 'false') RETURNING *",
      [name, email, bcryptPassword]
    );
    // 5. create jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
    //server error
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//Login
router.post("/login", validInfo, async (req, res) => {
  try {
    // 1. Destructure
    const { email, password } = req.body;
    // 2. Check if user doesn't exist (if not = error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist!");
    }
    // 3. Check if password is correct
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid password");
    }
    // 4. Give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
    //server error
  } catch (error) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//Verify token when refreshing React app
router.get("/is-verify", authorization, async (req, res) => {
  try {
    //Update user timestamp
    const tstamp = await pool.query(
      "UPDATE users SET user_last_log = NOW() WHERE user_id = $1",
      [req.user]
    );
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
