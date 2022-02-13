const router = require("express").Router();
const pool = require("../db");

//create comment
router.post("/", async (req, res) => {
  try {
    const { comment, authorId, postId, userName } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (content, author_id, post_id, user_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [comment, authorId, postId, userName]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all comments
router.get("/", async (req, res) => {
  try {
    id = req.query.id;
    const allComments = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [id]
    );
    res.json(allComments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
