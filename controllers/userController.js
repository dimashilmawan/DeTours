const User = require('./../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

// Do Not update password with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
