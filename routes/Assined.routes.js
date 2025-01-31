const { Router } = require("express");
const { assinedTask, getAssinedTask, updateAssinedTask, DeleteAssinedTask, UpdateDesignStatus, CountTotal } = require("../controllers/assined.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Validater } = require("../helper/checkvalidation");
const { assinedValidation } = require("../validations/purchase.validation");

const routes = Router();

routes.post("/create",Validater(assinedValidation),isAuthenticated,assinedTask);
routes.get("/get-assined",isAuthenticated,getAssinedTask);
routes.patch("/update/:id",isAuthenticated,updateAssinedTask);
routes.delete("/delete/:id",isAuthenticated,DeleteAssinedTask);
routes.patch("/update-status/:id",isAuthenticated,UpdateDesignStatus);
routes.get("/get-count",isAuthenticated,CountTotal);

module.exports = routes;