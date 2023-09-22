const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "items",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
