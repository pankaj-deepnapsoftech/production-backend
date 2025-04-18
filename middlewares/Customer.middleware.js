const { CustomerModel } = require("../models/customer.model");
const { TryCatch, ErrorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.isCustomerAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    throw new ErrorHandler("Authorization token not provided", 401);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    throw new ErrorHandler("Session expired, login again", 401);
  }
  const user = await CustomerModel.findOne({ email: verified?.email });
  if (!user) {
    throw new ErrorHandler("User doesn't exist", 400);
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  if (
    verified.iat < currentTimeInSeconds &&
    verified.exp > currentTimeInSeconds
  ) {
    req.user = {
        email: user.email,
        _id: user._id,
    }
    return next();
  }
  throw new ErrorHandler("Session expired, login again", 401);
});
