const {Router} = require("express");
const { purchaseController } = require("../controllers/Purchases.controller");
const { Validater } = require("../helper/checkvalidation");
const { PurchasesValidation } = require("../validations/purchase.validation");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isCustomerAuthenticated } = require("../middlewares/Customer.middleware");

const route = Router()

route.post("/create",isAuthenticated,Validater(PurchasesValidation),purchaseController.create)
route.get("/getAll",isAuthenticated,purchaseController.getAll)
route.get("/get/:id",isAuthenticated,purchaseController.getOne)
route.get("/customer-get",isCustomerAuthenticated,purchaseController.CustomerGet)
route.put("/update/:id",isAuthenticated,Validater(PurchasesValidation),purchaseController.update)
route.delete("/update/:id",isAuthenticated,purchaseController.Delete)

module.exports = route