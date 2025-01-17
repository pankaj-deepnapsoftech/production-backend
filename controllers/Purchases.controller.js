const { AssinedModel } = require("../models/Assined-to.model");
const { Purchase } = require("../models/Purchase");

class PurchaseController {
  async create(req, res) {
    const data = req.body;
    const newData = { ...data, user_id: req?.user._id };
    await Purchase.create(newData);
    return res.status(201).json({ message: "Purchase Order Gererated" });
  }

  async getAll(req, res) {

    const page = parseInt(req.query.page) || 1;  
  const limit = parseInt(req.query.limit) || 5;  
  const skip = (page - 1) * limit
    const data = await Purchase.aggregate([
      { $match: {} },
      {
        $lookup:{
          from:"users",
          localField:"user_id",
          foreignField:"_id",
          as:"user_id",
          pipeline:[
            {
              $lookup:{
                from:"user roles",
                localField:"role",
                foreignField:"_id",
                as:"role",
              }
            },
            {
              $project:{
                first_name:1,
                last_name:1,
                role:1,
              }
            }
          ]
        }
      },
      {
        $lookup:{
          from:"customers",
          localField:"customer_id",
          foreignField:"_id",
          as:"customer_id",
          pipeline:[
            {
              $project:{
                full_name:1,

              }
            }
          ]
        }
      },
      {
        $lookup:{
          from:"products",
          localField:"product_id",
          foreignField:"_id",
          as:"product_id",
          pipeline:[
            {
              $project:{
                name:1,
                category:1,
                item_type:1
              }
            }
          ]
        }
      },
      {
        $lookup:{
          from:"assineds",
          localField:"_id",
          foreignField:"sale_id",
          as:"assinedto",
          pipeline:[
           { $lookup: {
              from:"users",
              localField:"assined_to",
              foreignField:"_id",
              as:"assinedto",
              pipeline:[
                {
                  $lookup: {
                    from:"user-roles",
                    localField:"role",
                    foreignField:"_id",
                    as:"role",
                  }
                }
              ]
            }}
          ]
        }
      }
      
    ]).skip(skip).limit(limit).exec();
    

    return res.status(200).json({ message: "all purchases order found", data });
  }

  async getOne(req, res) {
    const { id } = req.params;
    const data = await Purchase.findById(id).populate(
      "user_id customer_id product_name assined_to"
    );
    return res.status(200).json({ message: "data found by id", data });
  }

  async CustomerGet(req, res) {
    const page = parseInt(req.query.page) || 1;  
  const limit = parseInt(req.query.limit) || 5;  
  const skip = (page - 1) * limit
    const data = await Purchase.aggregate([
      {
        $match: {
          customer_id: req?.user?._id,
        },
      },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product_id",
          as: "product_id",
          pipeline: [
            {
              $lookup: {
                from: "production-processes",
                foreignField: "item",
                localField: "_id",
                as: "process",
                pipeline:[
                    {
                        $project:{
                            processes:1
                        }

                    }
                ]
              },
            },
            {
                $project:{
                    name:1,
                    process:1
                }
            }
            
          ],
        },
      },
      {
        $lookup:{
          from:"assineds",
          localField:"_id",
          foreignField:"sale_id",
          as:"empprocess"
        }
      }
    ]).skip(skip).limit(limit).exec();
    return res.status(200).json({ message: "customer data found", data });
  }

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(400).json({ message: "data not found" });
    }
    await Purchase.findByIdAndUpdate(id, data);
    return res.status(201).json({ message: "Purchase Order updated" });
  }

  async Delete(req, res) {
    const { id } = req.params;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(400).json({ message: "data not found" });
    }
    await Purchase.findByIdAndDelete(id);
    return res.status(201).json({ message: "Purchase Order deleted" });
  }

  async Imagehandler(req,res){
    const {assined_to,assinedto_comment} = req.body;
    const {id} = req.params;
    const {filename} = req.file;
    const find = await Purchase.findById(id);
    if(!find){
      return res.status(404).json({
        message:"data not found try again"
      })
    }

    const path = `https://localhost:8069/images/${filename}`

    await Purchase.findByIdAndUpdate(id,{designFile:path})

    await AssinedModel.findByIdAndUpdate(assined_to,{isCompleted:true,assinedto_comment})
    return res.status(201).json({
      message:"file uploaded successful"
    })
   
  }

  async UpdateStatus(req,res){
    const {Status} = req.body;
    const {id} = req.params;
    const find = await Purchase.findById(id);
    if(!find){
      return res.status(404).json({
        message:"Data not found"
      })
    }
    await Purchase.findByIdAndUpdate(id,{Status})
    return res.status(201).json({
      message:"Status Approved Successful"
    })
  }

  async updateDesignStatus(req,res){
    const {customer_approve,customer_design_comment,assined_to} = req.body;
    const {id} = req.params;
    if(!customer_approve){
      return res.status(400).json({
        message:"customer is required"
      })
    }

    const find = await Purchase.findById(id);
    if(!find){
      return res.status(404).json({
        message:"Data not found"
      })
    }
    await Purchase.findByIdAndUpdate(id,{customer_approve,customer_design_comment})
    if(customer_approve !== "Approve" ){
      await AssinedModel.findByIdAndUpdate(assined_to,{isCompleted:false})
    }
    return res.status(201).json({
      message:"Status Approved Successful"
    })

  }
}

exports.purchaseController = new PurchaseController();
