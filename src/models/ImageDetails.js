const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema({
  image: String,
});

const ImageDetails = mongoose.model("imageDetails", ImageDetailsScehma);
module.exports = ImageDetails;