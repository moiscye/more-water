const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      unique: true,
    },
  },
  //records timestamps automatically
  { timestamps: true }
);
exports.Category = mongoose.model("Category", categorySchema);
