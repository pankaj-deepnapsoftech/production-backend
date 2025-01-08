const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Store Name is a required field"],
      minlength: [2, "Store Name should be atleast 2 characters long"],
      maxlength: [200, "Store Name cannot exceed 200 characters"],
    },
    gst_number: {
      type: String,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9A-Z]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
        "Please provide a valid GST Number",
      ],
    },
    address_line1: {
      type: String,
      required: [true, "Address Line 1 is a required field"],
      minlength: [10, "Address Line 1 should be atleast 10 characters long"],
      maxlength: [500, "Address Line 1 cannot exceed 500 characters"],
    },
    address_line2: {
      type: String,
      maxlength: [500, "Address Line 2 cannot exceed 500 characters"],
    },
    pincode: {
      type: Number,
      match: [/^[1-9][0-9]{5}$/, "Please provide a valid pincode"],
    },
    city: {
      type: String,
      required: [true, "City is a required field"],
      minlength: [2, "City should be atleast 10 characters long"],
      maxlength: [100, "City cannot exceed 500 characters"],
    },
    state: {
      type: String,
      required: [true, "State is a required field"],
      minlength: [2, "State should be atleast 10 characters long"],
      maxlength: [100, "State cannot exceed 500 characters"],
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Store = model("Store", storeSchema);
module.exports = Store;
