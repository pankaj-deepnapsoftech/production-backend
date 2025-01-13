const { Router } = require("express");
const { gardController } = require("../controllers/Gard.controller");
const { Validater } = require("../helper/checkvalidation");
const { GardValidation } = require("../validations/purchase.validation");


const router = Router();

router.post("/create",Validater(GardValidation),gardController.create)

module.exports = router;

