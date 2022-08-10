const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: { type: "String", unique: true, required: true ,trim: true },
    categoryUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
