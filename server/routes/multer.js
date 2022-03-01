const { application } = require("express");
const router = require("./jwtAuth");
const multer = require("multer");
const express = require("express");

//Use static for FE
router.use("/static", express.static("./images")); //i.e. http://localhost:5000/multer/static/image-1645983613779.jpeg

//Rename file using node file system
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image-${Date.now()}.${ext}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image files are allowed"));
  }
};

const upload = multer({ storage: fileStorage, fileFilter: isImage });

router.post("/", upload.single("image"), (req, res) => {
  res.json(req.file.filename);
});

module.exports = router;
