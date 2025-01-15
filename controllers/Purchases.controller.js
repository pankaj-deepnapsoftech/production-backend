const { Purchase } = require("../models/Purchase");

class PurchaseController {
  async create(req, res) {
    const data = req.body;
    const newData = { ...data, user_id: req?.user._id };
    await Purchase.create(newData);
    return res.status(201).json({ message: "Purchase Order Gererated" });
  }

  async getAll(req, res) {
    const data = await Purchase.find({}).populate(
      "user_id customer_id product_name assined_to"
    );
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
          localField: "product_name",
          as: "product_name",
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
    ]);
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
    const {id} = req.params;
    const {filename} = req.file;
    const find = await Purchase.findById(id);
    if(!find){
      return res.status(404).json({
        message:"data not found try again"
      })
    }

    const path = `http://localhost:8069/images/${filename}`

    await Purchase.findByIdAndUpdate(id,{designFile:path,design_status:"Completed"})
    return res.status(201).json({
      message:"file uploaded successful"
    })
   
  }
}

exports.purchaseController = new PurchaseController();
