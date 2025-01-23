const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  create,
  details,
  update,
  remove,
  all,
  markDone,
  getAccountantData,
} = require("../controllers/process");
const router = express.Router();

router.get("/accountant-data",isAuthenticated, getAccountantData);
router.post("/", isAuthenticated, create);
router.get("/all", isAuthenticated, all);
router.get("/done/:_id", isAuthenticated, markDone);
router
  .route("/:_id")
  .get(isAuthenticated, details)
  .put(isAuthenticated, update)
  .delete(isAuthenticated, remove);
module.exports = router;
