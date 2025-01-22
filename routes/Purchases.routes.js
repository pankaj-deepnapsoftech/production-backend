const {Router} = require("express");
const { purchaseController } = require("../controllers/Purchases.controller");
const { Validater } = require("../helper/checkvalidation");
const { PurchasesValidation } = require("../validations/purchase.validation");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isCustomerAuthenticated } = require("../middlewares/Customer.middleware");
const  Imageupload  = require("../utils/image.multer");

const route = Router()

route.post("/create",isAuthenticated,Validater(PurchasesValidation),purchaseController.create)
route.get("/getAll",isAuthenticated,purchaseController.getAll)
route.get("/get/:id",isAuthenticated,purchaseController.getOne)
route.get("/customer-get",isCustomerAuthenticated,purchaseController.CustomerGet)
route.put("/update/:id",isAuthenticated,Validater(PurchasesValidation),purchaseController.update)
route.delete("/delete/:id",isAuthenticated,purchaseController.Delete)
route.patch("/upload-image/:id",isAuthenticated,Imageupload.single("image"),purchaseController.Imagehandler)
route.patch("/approve-status/:id",isCustomerAuthenticated,purchaseController.UpdateStatus)
route.patch("/image-status/:id",isCustomerAuthenticated,purchaseController.updateDesignStatus)
route.get("/sales-graph",isAuthenticated,purchaseController.graphData)
route.get("/all", isAuthenticated,purchaseController.All)
route.get("/topSales",  isAuthenticated,purchaseController.getNewestSales);

module.exports = route