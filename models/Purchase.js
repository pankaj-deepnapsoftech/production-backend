const { Schema, model } = require("mongoose");

const Purchases = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    product_type: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    product_qty: { type: Number, required: true, trim: true, default: 0 },
    GST: { type: Number, required: true, trim: true },
    productFile: { type: String },
    designFile: { type: String },
    Status: { type: String, required: true, trim: true, default: "Pending" },
    customer_approve: { type: String, required: true, default: "Pending" },
    comment: { type: String, trim: true },
    customer_design_comment: { type: String, trim: true },
    invoice: { type: String },
    customer_pyement_ss: { type: String },
    customer_order_ss: { type: String },
    product_status: { type: String, enum: ["Dispatch", "Delivered"] },
    paymet_status: { type: String },
    payment_verify: { type: Boolean },
    tracking_id: { type: String },
    tracking_web: { type: String },
    token_amt: { type: Number },
    token_status: { type: Boolean },
    token_ss: { type: String },
    isSampleApprove: { type: Boolean },
    isTokenVerify: { type: Boolean },
  },
  { timestamps: true }
);

exports.Purchase = model("purchase", Purchases);
