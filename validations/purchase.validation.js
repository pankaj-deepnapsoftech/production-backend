const {object,string} = require("yup");


const PurchasesValidation = object({
    product_name:string().required("product name must be Required"),
    product_type:string().required("product type must be Required"),
    price:string().required("product price must be Required"),
    product_qty:string().required("product QTY must be Required"),
    supplyer:string().required("Supplyer Name must be Required"),
    Status:string().required("product Status must be Required"),
})

const GardValidation = object({
    type: string().required("Type is "),
    details: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim:  true },
    purpes: { type: String, required: true, trim: true},
    contact_persone: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
})

module.exports = {PurchasesValidation}