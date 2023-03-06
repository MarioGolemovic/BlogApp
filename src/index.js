const express = require("express");
const app = express();
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP method -" + req.method + ", URL -" + req.url);
  next();
});

app.use("/users", userRouter);
app.use("/note", noteRouter);
app.use("/comment", commentRouter);

mongoose
  .connect("mongodb://127.0.0.1/app")
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
