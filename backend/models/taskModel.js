const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const taskSchema = new mongoose.Schema(
  {
    id: Number,
    taskName: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    ognoo: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

// Define and export the User model
const Task = mongoose.model("task", taskSchema);

module.exports = Task;
