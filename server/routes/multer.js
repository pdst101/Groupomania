const router = require("express").Router();
const pool = require("../db");

const { upload, uploadImage } = require("../middleware/multerControl");

router.post("/upload", uploadImage, upload);

module.exports = router;
