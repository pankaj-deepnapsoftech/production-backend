const { Router } = require("express");
const { assinedTask, getAssinedTask } = require("../controllers/assined.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const routes = Router();

routes.post("/create",isAuthenticated,assinedTask)
routes.get("/get-assined",isAuthenticated,getAssinedTask)

module.exports = routes;