const { CustomerModel } = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class CustomerController {
  async create(req, res) {
    const data = req.body;
    const find = await CustomerModel.findOne({ email: data.email });
    if (find) {
      return res.status(400).json({
        message: "user already exist",
      });
    }
    await CustomerModel.create(data);
    res.status(201).json({
      message: "Customer created successful",
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await CustomerModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Exist",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(403).json({
        message: "Wrong Password",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        iat: Math.floor(Date.now() / 1000) - 30,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    user.password = null;
    return res.status(200).json({message:"Login Successful",user,token})
  }

  async createNewPassword(req,res){
    const {oldPassword,newPassword} = req.body;
    const user = await CustomerModel.findById(req?.user?._id)
    if(!user){
        return res.status(404).json({
            message:"Bad credintials"
        })
    }

    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(403).json({
        message: "Old Password is Not matched",
      });
    }

    await CustomerModel.findByIdAndUpdate(req?.user?._id,{password:newPassword})
    return res.status(201).json({
        message:"New Password Created"
    })

  }
}

module.exports = { CustomerController };
