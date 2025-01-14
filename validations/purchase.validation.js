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
    type: string().required("Type is Required"),
    name: string().required("Name is Required"),
    phone: string().min(10).max(12).required("Phone Number is Required"),
    address: string().required("Address is Required"),
    status: string().required("Status is Required"),
})

module.exports = {PurchasesValidation,GardValidation}