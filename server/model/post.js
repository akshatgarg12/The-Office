const mongoose = require("mongoose");
const { ObjectId } = mongoose.SchemaTypes;

const postSchema = new mongoose.Schema(
  {
    html: {
      type: String,
      trim: false,
      default: "<div></div>",
    },
    img: {
      type: String,
      default: "",
    },
    created_by: {
      type: ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Post", postSchema);
