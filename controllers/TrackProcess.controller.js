const ProductionProcess = require("../models/productionProcess");
const { TryCatch } = require("../utils/error");


exports.TrackProcess = TryCatch(async (req,res)=> {
    const {name} = req.query;
    const find = await ProductionProcess.find({}).populate("item");
    const data = find.filter((item)=>(item.item.name.trim().toLowerCase().includes(name.trim().toLowerCase())));
    return res.status(200).json({message:"data found",data});
})