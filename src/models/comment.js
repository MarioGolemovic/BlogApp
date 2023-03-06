const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    noteID: {
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
module.exports = mongoose.model("Comment", CommentSchema);
