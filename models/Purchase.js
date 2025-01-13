const { Schema, model } = require("mongoose");

const Files = new Schema({
  file: {
    type: String,
    required: true,
  },
  file_id: {
    type: String,
    required: true,
  },
});

const Purchases = new Schema({
  user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
  product_name: { type: String, required: true ,trim:true },
  product_type: { type: String, required: true,trim:true },
  price: { type: String, required: true,trim:true },
  product_qty: { type: String, required: true,trim:true },
  supplyer: { type: String, required: true,trim:true },
  invoice_number: { type: String,trim:true },
  invoice_file: Files,
  Status: { type: String, required: true,trim:true },
},{timestamps:true});

exports.Purchase = model("purchase",Purchases)
