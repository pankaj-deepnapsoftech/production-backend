const { Schema, model } = require("mongoose");

const GST = new Schema({
  CGST:{type:Number,trim:true},
  SGST:{type:Number,trim:true},
  IGST:{type:Number,trim:true},
})

const Purchases = new Schema({
  user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
  customer_id:{type:Schema.Types.ObjectId,ref:"Customer",required:true},
  product_id: {type:Schema.Types.ObjectId,ref:"Product",required:true},
  product_type: { type: String, required: true,trim:true },
  price: { type: Number, required: true,trim:true },
  product_qty: { type: Number, required: true,trim:true ,default:0 },
  GST: GST,
  designFile: {type:String},
  Status: { type: String, required: true,trim:true,default:"Pending" },
  customer_approve : {type:String,required:true,default:"Pending"},
  comment :{type:String,trim:true},
  customer_design_comment : {type:String,trim:true},
  invoice:{type:String},
  customer_pyement_ss:{type:String},
  customer_order_ss:{type:String},
  product_status:{type:String,enum:["Dispatch","Delivered"]},
  paymet_status:{type:String},
  payment_verify:{type:Boolean},
  tracking_id:{type:String},
  tracking_web:{type:String}

},{timestamps:true});

exports.Purchase = model("purchase",Purchases)
