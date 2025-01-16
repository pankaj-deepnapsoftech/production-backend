const { Router } = require("express");
const { assinedTask, getAssinedTask, updateAssinedTask, DeleteAssinedTask } = require("../controllers/assined.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Validater } = require("../helper/checkvalidation");
const { assinedValidation } = require("../validations/purchase.validation");

const routes = Router();

routes.post("/create",Validater(assinedValidation),isAuthenticated,assinedTask);
routes.get("/get-assined",isAuthenticated,getAssinedTask);
routes.patch("/update/:id",isAuthenticated,updateAssinedTask);
routes.patch("/delete/:id",isAuthenticated,DeleteAssinedTask)

module.exports = routes;