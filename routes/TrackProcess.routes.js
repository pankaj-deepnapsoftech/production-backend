const { Router } = require("express");
const { TrackProcess } = require("../controllers/TrackProcess.controller");

const route = Router();

route.get("/track-process",TrackProcess);



module.exports = route