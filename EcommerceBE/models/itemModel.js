const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "An Item must have an image"],
      unique: true,
    },
    itemName: {
      type: String,
      required: [true, "An Item must have an image"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "An Item must have an image"],
    },
    quantity: {
      type: Number,
      required: [true, "An Item must have an image"],
      default: 0,
    },
    purchasedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("items", itemSchema);

module.exports = Item;
