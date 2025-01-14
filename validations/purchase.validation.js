const { object, string,number} = require("yup");



const PurchasesValidation = object({
  customer_id: string().required("Customer Id is Required"),
  product_name: string().required("Product Id is Required"),
  product_type: string().required("Product Type is Required"),
  price: number().required("Price is Required"),
  product_qty:number().required("Price is Required") ,
  assined_to:string().required("Assined to id is"),
});

const GardValidation = object({
  type: string().required("Type is Required"),
  name: string().required("Name is Required"),
  phone: string().min(10).max(12).required("Phone Number is Required"),
  address: string().required("Address is Required"),
  status: string().required("Status is Required"),
});

module.exports = { PurchasesValidation, GardValidation };
