const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "ShortDescription is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      unique: true,
      trim: true,
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount Price is required"],
      unique: true,
      trim: true,
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
    },
    // varients: [
    //   {
    //     size: {
    //       type: String,
    //       required: [true, "Size is required"],
    //       trim: true,
    //     },
    //     color: {
    //       type: String,
    //       required: [true, "Color is required"],
    //       trim: true,
    //     },
    //   },
    // ],
    tag: {
      type: String,
      required: [true, "Tag is required"],
      trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Archieved"],
        required: [true, "Status is required"],
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: [true, "Needed"],
        trim: true,
    },
    // ratings: [
    //   {
    //     average: {
    //       type: Number,
    //       required: [true, "Average is required"],
    //       trim: true,
    //     },
    //     count: {
    //       type: Number,
    //       required: [true, "Count is required"],
    //       trim: true,
    //     },
    //   },
    // ],
    image: {
      type: String,
      default: "product.jpg"
    },
  },
  {
    timestamps: true,
  },
);


const productModel = mongoose.model("product", productSchema);

module.exports = productModel;