const { GardModels } = require("../models/Gard.models");

class GardController {
    async create(req,res){
        const data = req.body;
        await GardModels.create(data)
        return res.status(200).json({message:"New Entry has been created" })
    }

    async getAll(_req,res){
        const data = await GardModels.find({});
        return res.status(200).json({
            message:"data found",
            data
        })
    }

    async getOne(req,res){
        const {id} = req.params;
        const data = await GardModels.findById(id);
        if(!data){
            return res.status(404).json({
                message:"Wrong ID"
            })
        }
        return res.status(200).json({message:"data found",data})
    }

    async update(req,res){
        const data = req.body;
        const {id} = req.params;
        const find = await GardModels.findById(id);
        if(!find){
            return res.status(404).json({message:"Wrong ID"});
        };
        await GardModels.findByIdAndUpdate(id,data);
        return res.status(200).json({message:"Data Updated successful"})
    }

    async delete(req,res){
        const {id} = req.params;
        const find = await GardModels.findById(id);
        if(!find){
            return res.status(404).json({message:"Wrong ID"});
        };
        await GardModels.findByIdAndDelete(id);
        return res.status(200).json({message:"Data Deleted successful"})

    }
}

exports.gardController = new GardController();