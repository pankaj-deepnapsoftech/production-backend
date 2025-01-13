const { Purchase } = require("../models/Purchase");

class PurchaseController {

    async create(req,res){
        const data = req.body;
        const newData = {...data,user_id:req?.user._id}
        await Purchase.create(newData);
        return res.status(201).json({message:"Purchase Order Gererated"})
    }

    async getAll (req,res){
        const data = await Purchase.find({user_id:req?.user._id});
        return res.status(200).json({message:"all purchases order found",data})
    }

    async getOne (req,res){
        const {id} = req.params;
        const data = await Purchase.findById(id);
        return res.status(200).json({message:"data found by id",data});
    }

    async update(req,res){
        const data = req.body;
        const {id} = req.params;
       const find =  await Purchase.findById(id);
        if(!find){
            return res.status(400).json({message:"data not found"});
        }
        await Purchase.findByIdAndUpdate(id,data)
        return res.status(201).json({message:"Purchase Order updated"})
    }
    
    async Delete(req,res){
        const {id} = req.params;
       const find =  await Purchase.findById(id);
        if(!find){
            return res.status(400).json({message:"data not found"});
        }
        await Purchase.findByIdAndDelete(id)
        return res.status(201).json({message:"Purchase Order deleted"})
    }

}

exports.purchaseController =  new PurchaseController()
