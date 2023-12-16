const mongoose = require("mongoose");
const PlayerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
        type: String,
        required: true,
    },
    injury: {
        type: String,
        required: true,
    },
    age: {
      type: String,
      required: true,
    },
    number: {
        type: String,
        required: true,
      },
    yellow: {
        type: String,
        required: true,
      },
    red: {
        type: String,
        required: true,
      },
    goals: {
        type: String,
        required: true,
      },
    assists: {
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
module.exports = mongoose.model("Player", PlayerSchema);
