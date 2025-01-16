const { Router } = require("express");
const { assinedTask, getAssinedTask } = require("../controllers/assined.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Validater } = require("../helper/checkvalidation");
const { assinedValidation } = require("../validations/purchase.validation");

const routes = Router();

routes.post("/create",Validater(assinedValidation),isAuthenticated,assinedTask)
routes.get("/get-assined",isAuthenticated,getAssinedTask)

module.exports = routes;