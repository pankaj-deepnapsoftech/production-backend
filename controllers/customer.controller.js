const { CustomerModel } = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const OTP = require("../models/otp");
const { generateOTP } = require("../utils/generateOTP");
const { ErrorHandler } = require("../utils/error");
const { sendEmail } = require("../utils/sendEmail");

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

  async getAll(req,res){
    const data = await CustomerModel.find({});
    return res.status(200).json({
      message:"All customers data",data
    })
  }

  async emailVerify(req,res){
    const {email} = req.body;
    if(!email){
      return res.status(400).json({
        message:"email is required"
      })
    }
    const user = await CustomerModel.findOne({email});
    if(!user){
      return res.status(404).json({
        message:"email Not exist"
      })
    }
    let otp = generateOTP(4)
    const findOTP = await OTP.findOne({email})
    if(!findOTP){
      await OTP.create({email,otp})
    }else{
      await OTP.findByIdAndUpdate(findOTP._id,otp)
    }

    sendEmail(
        "Account Verification",
        `
          <strong>Dear ${user.full_name}</strong>,
      
          <p>Thank you for registering with us! To complete your registration and verify your account, please use the following One-Time Password (OTP): <strong>${otp}</strong></p>
    
          <p>This OTP is valid for 5 minutes. Do not share your OTP with anyone.</p>
          `,
        user?.email
      );

      res.status(200).json({
        status: 200,
        success: true,
        message:
          "User has been created successfully. OTP has been successfully sent to your email id",
        user,
      });
    
  }

  // async resetPassword(req,res){
  //   const {email,otp,newPassword} = req.body;
  //   if (!(email || otp || newPassword)){
  //     return res.status(400).json({
  //       message:"OTP or new Password is required"
  //     })
  //   }

  //   const find = await OTP.


  // }
}

module.exports = { CustomerController };
