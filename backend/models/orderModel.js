const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Утасны дугаараа оруулна уу?"],
      unique: true,
      trim: true,
      maxlength: [100, "Утасны дугаараа оруулна уу?"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
