const { Schema, model } = require("mongoose");

const Files = new Schema({
  file: {
    type: String,
  },
  file_id: {
    type: String,
  },
});

const GST = new Schema({
  CGST:{type:Number,trim:true},
  SGST:{type:Number,trim:true},
  IGST:{type:Number,trim:true},
})

const Purchases = new Schema({
  user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
  customer_id:{type:Schema.Types.ObjectId,ref:"Customer",required:true},
  product_name: {type:Schema.Types.ObjectId,ref:"Product",required:true},
  product_type: { type: String, required: true,trim:true },
  price: { type: Number, required: true,trim:true },
  product_qty: { type: Number, required: true,trim:true },
  GST: GST,
  designFile: Files,
  Status: { type: String, required: true,trim:true,default:"Pending" },
  assined_to:{type:Schema.Types.ObjectId,ref:"User"},
  customer_approve : {type:String,required:true,default:"Pending"}
},{timestamps:true});

exports.Purchase = model("purchase",Purchases)
