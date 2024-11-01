const mongoose = require("mongoose");

const interestedWorkSchema = new mongoose.Schema(
  {
    workId: {
      ref: "work",
      type: String,
    },
    quantity: Number,
    userId: String,

    workName: {
      ref: "work",
      type: String,
    },
    category: {
      ref: "work",
      type: String,
    },
    workImage: {
      ref: "work",
      type: String,
    },
    niitHemjee: {
      ref: "work",
      type: String,
    },
    description: {
      ref: "work",
      type: String,
    },
    price: {
      ref: "work",
      type: String,
    },
    sellingPrice: {
      ref: "work",
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const interestedWorkModel = mongoose.model(
  "interestedWork",
  interestedWorkSchema
);

module.exports = interestedWorkModel;
