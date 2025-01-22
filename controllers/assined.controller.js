const { AssinedModel } = require("../models/Assined-to.model");
const { TryCatch } = require("../utils/error");

const assinedTask = TryCatch(async (req, res) => {
  const data = req.body;
  const find = await AssinedModel.findOne({sale_id:data.sale_id,assined_process:data.assined_process.toLowerCase().trim()})
  if(find){
    return res.status(400).json({
      message:"task is already assined"
    })
  }
  await AssinedModel.create({...data,assined_by:req?.user._id});
  return res.status(201).json({
    message: "Task assined Successful",
  });
});

const getAssinedTask = TryCatch(async (req, res) => {
  const { _id } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const data = await AssinedModel.aggregate([
    {
      $match: { assined_to: _id },
    },
   {
    $lookup:{
      from:"users",
      foreignField:"_id",
      localField:"assined_by",
      as:"assined_by",
      pipeline:[
        {
          $lookup:{
            from:"user-roles",
            foreignField:"_id",
            localField:"role",
            as:"role",
          }
        }
      ]
    }
   },
   {
    $lookup:{
      from:"purchases",
      localField:"sale_id",
      foreignField:"_id",
      as:"sale_id",
      pipeline:[
        {
          $lookup:{
            from:"products",
            localField:"product_id",
            foreignField:"_id",
            as:"product_id",
          }
        }
      ]
    }
   }
  ]).sort({ _id: -1 }).skip(skip)
    .limit(limit)
    .exec();
  return res.status(200).json({ message: "data found", data });
});

const updateAssinedTask = TryCatch(async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  const data = await AssinedModel.findById(id);
  if (!data) {
    return res.status(404).json({
      message: "data not found",
    });
  }
  await AssinedModel.findByIdAndUpdate(id, value);
  return res.status(201).json({
    message: "Task Assined Updated",
  });
});

const DeleteAssinedTask = TryCatch(async (req, res) => {
  const { id } = req.params;
  const data = await AssinedModel.findById(id);
  if (!data) {
    return res.status(404).json({
      message: "data not found",
    });
  }
  await AssinedModel.findByIdAndDelete(id);
  return res.status(201).json({
    message: "Task Deleted successful",
  });
});

module.exports = {
  assinedTask,
  getAssinedTask,
  updateAssinedTask,
  DeleteAssinedTask,
};
