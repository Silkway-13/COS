const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    workName: {
      type: String,
      required: [true, "Ажлын нэрийг оруулна уу?"],
      unique: true,
      trim: true,
      maxlength: [
        100,
        "Ажлын нэрний урт хэтэрсэн байна. Дээд талдаа 100 тэмдэгт байх ёстой.",
      ],
    },
    category: String,
    workImage: [],
    niitHemjee: {
      type: Number,
    },
    description: {
      type: String,
      required: [true, "Ажлын тайлбарыг оруулна уу?"],
      trim: true,
      maxlength: [
        1000,
        "Тайлбарын урт хэтэрсэн байна. Дээд талдаа 1000 тэмдэгт байх ёстой.",
      ],
    },
    price: {
      type: Number,
      required: [true, "Үнийг оруулна уу?"],
      trim: true,
    },
    sellingPrice: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// энэ дундаж үнэ ажил хасагдах үед ажиллахгүй байгаа асуудлыг шийдээгүй болно.

workSchema.virtual("zahialagch").get(function () {
  return "Ger Company";
});

const workModel = mongoose.model("work", workSchema);

module.exports = workModel;
