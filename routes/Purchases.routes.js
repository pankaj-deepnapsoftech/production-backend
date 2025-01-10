const {Router} = require("express");
const { purchaseController } = require("../controllers/Purchases.controller");
const { Validater } = require("../helper/checkvalidation");
const { PurchasesValidation } = require("../validations/purchase.validation");

const route = Router()

route.post("/create",Validater(PurchasesValidation),purchaseController.create)
route.get("/getAll",purchaseController.getAll)
route.get("/get/:id",purchaseController.getOne)
route.put("/update/:id",Validater(PurchasesValidation),purchaseController.update)
route.delete("/update/:id",purchaseController.Delete)

module.exports = route