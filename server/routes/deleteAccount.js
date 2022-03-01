const router = require("express").Router();
const pool = require("../db");

//delete account
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAccount = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    const deletePosts = await pool.query(
      "DELETE FROM posts WHERE author_id = $1",
      [id]
    );
    res.json("User account was successfully deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
