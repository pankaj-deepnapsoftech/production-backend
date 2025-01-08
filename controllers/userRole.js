const UserRole = require("../models/userRole");
const { TryCatch, ErrorHandler } = require("../utils/error");

exports.create = TryCatch(async (req, res) => {
  const role = req.body;
  if (!role) {
    throw new ErrorHandler("Please provide all the fields", 400);
  }
  const createdRole = await UserRole.create({ ...role });
  res.status(200).json({
    status: 200,
    success: true,
    message: "User role has been created successfully",
    role: createdRole,
  });
});
exports.edit = TryCatch(async (req, res) => {
  const { _id, role, permissions } = req.body;
  if (!_id) {
    throw new ErrorHandler("_id is a required field", 400);
  }

  const userRole = await UserRole.findById(_id);
  if (!userRole) {
    throw new ErrorHandler("User role not found", 400);
  }

  const roleUpdated = await UserRole.findByIdAndUpdate(
    { _id },
    { $set: { role, permissions } },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: "User role has been updated successfully",
    role: roleUpdated,
  });
});
exports.remove = TryCatch(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new ErrorHandler("_id is a required field", 400);
  }

  const userRole = await UserRole.findById(_id);
  if (!userRole) {
    throw new ErrorHandler("User role not found", 400);
  }
  await userRole.deleteOne();

  res.status(200).json({
    status: 200,
    success: true,
    message: "User role has been deleted successfully",
  });
});
exports.details = TryCatch(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    throw new ErrorHandler("_id is a required field", 400);
  }

  const userRole = await UserRole.findById(_id);
  if (!userRole) {
    throw new ErrorHandler("User role not found", 400);
  }

  res.status(200).json({
    status: 200,
    success: true,
    userRole,
  });
});
exports.all = TryCatch(async (req, res)=>{
  const roles = await UserRole.find().sort({'updatedAt': -1});
  res.status(200).json({
    status: 200,
    success: true,
    roles
  })
})