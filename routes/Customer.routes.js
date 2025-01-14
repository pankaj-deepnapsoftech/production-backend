const { Router } = require("express");
const { CustomerController } = require("../controllers/customer.controller");
const { Validater } = require("../helper/checkvalidation");
const { CustomerValidation, CustomerLoginValidate, CustomerPasswordValidation } = require("../validations/customer.validation");
const { isCustomerAuthenticated } = require("../middlewares/Customer.middleware");


const routes = Router();

routes.post("/create",Validater(CustomerValidation), CustomerController.prototype.create)
routes.post("/login",Validater(CustomerLoginValidate), CustomerController.prototype.login)
routes.post("/change-password",isCustomerAuthenticated,Validater(CustomerPasswordValidation), CustomerController.prototype.createNewPassword)


module.exports = routes;