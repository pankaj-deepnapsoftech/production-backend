const { Router } = require("express");
const { CustomerController } = require("../controllers/customer.controller");
const { Validater } = require("../helper/checkvalidation");
const { CustomerValidation, CustomerLoginValidate, CustomerPasswordValidation } = require("../validations/customer.validation");
const { isCustomerAuthenticated } = require("../middlewares/Customer.middleware");
const { isAuthenticated } = require("../middlewares/isAuthenticated");


const routes = Router();

routes.post("/create",Validater(CustomerValidation), CustomerController.prototype.create)
routes.post("/login",Validater(CustomerLoginValidate), CustomerController.prototype.login)
routes.post("/change-password",isCustomerAuthenticated,Validater(CustomerPasswordValidation), CustomerController.prototype.createNewPassword)
routes.get("/get-all",isAuthenticated,CustomerController.prototype.getAll)
routes.post("/verify-email",CustomerController.prototype.emailVerify)


module.exports = routes;