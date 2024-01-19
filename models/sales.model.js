const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    item: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Sales = mongoose.model("Sale", salesSchema);

module.exports = Sales;
