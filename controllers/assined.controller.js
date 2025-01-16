const { AssinedModel } = require("../models/Assined-to.model");
const { TryCatch } = require("../utils/error");


const assinedTask = TryCatch(async(req,res)=>{
    const data = req.body;
    await AssinedModel.create(data);
    return res.status(201).json({
        message:"Task assined Successful"
    })
})

const getAssinedTask = TryCatch(async(req,res)=>{
    const {_id} = req.user;
    const data = await AssinedModel.aggregate([
        {
            $match:{assined_to:_id}
        },
        {
            $lookup:{
                from:"purchases",
                localField:"sale_id",
                foreignField:"_id",
                as :"sale_id",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"user_id",
                            foreignField:"_id",
                            as :"user_id",
                            pipeline:[
                                {
                                    $project:{
                                        first_name:1,
                                        last_name:1,
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
                            as :"product_id",
                            pipeline:[
                                {
                                    $project:{
                                        name:1,
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
       
    ])
    return res.status(200).json({message:"data found",data})
})


module.exports = {assinedTask,getAssinedTask}