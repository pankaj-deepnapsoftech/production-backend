const { Router } = require("express");
const { purchaseController } = require("../controllers/Purchases.controller");
const { Validater } = require("../helper/checkvalidation");
const { PurchasesValidation } = require("../validations/purchase.validation");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  isCustomerAuthenticated,
} = require("../middlewares/Customer.middleware");
const Imageupload = require("../utils/image.multer");

const route = Router();

route.post(
  "/create",
  isAuthenticated,
  Imageupload.single("productFile"),
  purchaseController.create
);
route.get("/getAll", isAuthenticated, purchaseController.getAll);
route.get("/getOne", isAuthenticated, purchaseController.getOne);
route.get(
  "/customer-get",
  isCustomerAuthenticated,
  purchaseController.CustomerGet
);
route.put(
  "/update/:id",
  isAuthenticated,
  Validater(PurchasesValidation),
  purchaseController.update
);
route.delete("/delete/:id", isAuthenticated, purchaseController.Delete);
route.patch(
  "/upload-image/:id",
  isAuthenticated,
  Imageupload.single("image"),
  purchaseController.Imagehandler
);





route.patch(
  "/approve-status/:id",
  isCustomerAuthenticated,
  purchaseController.UpdateStatus
);
route.patch(
  "/image-status/:id",
  isCustomerAuthenticated,
  purchaseController.updateDesignStatus
);

route.patch(
  "/sales_design_status/:id",
  purchaseController.sales_design_status
);

route.get("/sales-graph", isAuthenticated, purchaseController.graphData);
route.get("/all", isAuthenticated, purchaseController.All);
route.patch(
  "/upload-invoice/:id",
  isAuthenticated,
  Imageupload.single("invoice"),
  purchaseController.uploadPDF
);
route.patch(
  "/payement-image/:id",
  isCustomerAuthenticated,
  Imageupload.single("payment"),
  purchaseController.uploadPaymentSS
);
route.patch(
  "/verify-payement/:id",
  isAuthenticated,
  purchaseController.VerifyPayement
);
route.patch("/dispatch/:id", isAuthenticated, purchaseController.Dispatch);
route.patch(
  "/delivery/:id",
  isCustomerAuthenticated,
  Imageupload.single("delivery"),
  purchaseController.Delivered
);

route.patch("/addToken/:id", isAuthenticated, purchaseController.AddToken);

route.patch("/updatesales/:id", isAuthenticated, purchaseController.updatesale);

route.patch(
  "/tokenProof/:id",
  isCustomerAuthenticated,
  Imageupload.single("token_ss"),
  purchaseController.uploadTokenSS
);

route.patch("/verifyToken/:id", isAuthenticated, purchaseController.VerifyToken);

route.patch("/approveSample/:id", isAuthenticated, purchaseController.ApproveSample);

module.exports = route;
