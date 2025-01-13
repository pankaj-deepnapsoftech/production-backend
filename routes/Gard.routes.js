const { Router } = require("express");
const { gardController } = require("../controllers/Gard.controller");


const router = Router();

router.post("/create",gardController.create)

module.exports = router;

