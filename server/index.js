const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//         MIDDLEWARE
app.use(express.json()); //access to req.body
app.use(cors());

//           ROUTES
// LOGIN/REG
//register and login routes
app.use("/auth", require("./routes/jwtAuth"));
//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// POST
//create, get all, get 1, edit, delete routes
app.use("/posts", require("./routes/posts"));

//create, get all comments
app.use("/comments", require("./routes/comments"));

//multer
app.use("/multer", require("./routes/multer"));

app.listen(5000, () => console.log("server is running on port 5000"));
