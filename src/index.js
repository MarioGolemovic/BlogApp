const express = require("express");
const app = express();
const cors = require('cors');
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const playerRouter = require("./routes/playerRoutes");
const path = require("path");
const ImageDetails = require("./models/ImageDetails");
const multer = require("multer");


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use((req, res, next) => {                  
  console.log("HTTP method -" + req.method + ", URL -" + req.url); 
  next();
});

app.use("/users", userRouter); 
app.use("/note", noteRouter); 
app.use("/comment", commentRouter);
app.use("/player", playerRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./public/Images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  ImageDetails.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/get-image", async (req, res) => {
  ImageDetails.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});


mongoose
  .connect("mongodb://root:mongodb@localhost:27017")
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port 5000");  
    });
  })
  .catch((error) => { 
    console.log(error); 
  });



