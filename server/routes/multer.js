const { application } = require("express");
const router = require("./jwtAuth");
const multer = require("multer");

//Rename file using node file system

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../images");
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
  let ext = req.file.mimetype.split("/")[1];
  let fileName = `image-${Date.now()}.${ext}`;
  res.send("200");
});

module.exports = router;
