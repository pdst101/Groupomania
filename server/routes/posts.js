const router = require("express").Router();
const pool = require("../db");

//create post
router.post("/", async (req, res) => {
  try {
    const { content, authorId } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (content, author_id) VALUES ($1, $2) RETURNING *",
      [content, authorId]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      id,
    ]);
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const editPost = await pool.query(
      "UPDATE posts SET content = $1 WHERE post_id = $2",
      [content, id]
    );
    res.json("Post was successfully updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1",
      [id]
    );
    res.json("Post was successfully deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
