const mongoose = require("mongoose");
const CommenteSchema = mongoose.Schema(
  {
    commente: {
      type: String,
      required: true,
    },
    postID: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Commente", CommenteSchema);
