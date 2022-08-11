
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var helmet = require("helmet");
const userRouter = require("./2-routes/UserRoutes");
const movieRouter = require("./2-routes/MovieRoutes");
const categoryRoutes = require("./2-routes/categoryRoutes");

const error4040 = require("./middleware/Error404");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const multer = require("multer");

app.use(helmet());

const URI_LINK = process.env.MONGODB_CONNECTION_LINK;

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

app.use("/api/user", userRouter);

app.use("/api/movie", upload.single("image"), movieRouter);
app.use("/images", express.static(path.join(__dirname, "images\\")));

app.use("/api/category", categoryRoutes);

app.use("/", error4040);

mongoose
  .connect(URI_LINK)
  .then((result) => {
    console.log("\x1b[36m", "connected to mongo", "\x1b[0m");

    app.listen(port, () => {
      console.log("connected to " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
