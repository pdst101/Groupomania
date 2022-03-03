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

//get comment
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await pool.query(
      "SELECT * FROM comments WHERE comment_id = $1",
      [id]
    );
    res.json(comment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Edit comment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const editComment = await pool.query(
      "UPDATE comments SET content = $1 WHERE comment_id = $2",
      [content, id]
    );
    res.json("Comment was successfully updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteComment = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1",
      [id]
    );
    res.json("Comment was successfully deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
