const {object,string} = require("yup");


const PurchasesValidation = object({
    product_name:string().required("product name must be Required"),
    product_type:string().required("product type must be Required"),
    price:string().required("product price must be Required"),
    product_qty:string().required("product QTY must be Required"),
    supplyer:string().required("Supplyer Name must be Required"),
    Status:string().required("product Status must be Required"),
})


module.exports = {PurchasesValidation}