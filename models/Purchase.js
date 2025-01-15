const { Schema, model } = require("mongoose");



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
  product_qty: { type: Number, required: true,trim:true ,default:0 },
  GST: GST,
  designFile: {type:String},
  Status: { type: String, required: true,trim:true,default:"Pending" },
  design_status:{type: String, required: true,trim:true,default:"In progress"},
  assined_to:{type:Schema.Types.ObjectId,ref:"User"},
  customer_approve : {type:String,required:true,default:"Pending"},
  customer_comment :{type:String,}
},{timestamps:true});

exports.Purchase = model("purchase",Purchases)
