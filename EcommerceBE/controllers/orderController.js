const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//Get order details from customer to particular shopkeeper
const postOrder = catchAsync(async (req, res, next) => {
  const data = req.body;
  const proId = req.params.id;
  console.log(proId);
  const user_id = req.user._id;
  const body = {
    ...data,
    orderBy: user_id,
    productId: proId,
  };

  const order = await Order.create(body);
  res.status(200).json({
    status: "success",
    message: "Order placed successfully",
    data: {
      order,
    },
  });
});
//get orders recieved for shopkeeper
const getOrders = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const order = await Order.find({
    ownedBy: user_id,
  }).populate("orderBy productId");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Order recieved successfully",
    data: {
      order,
    },
  });
});

//Update the status of order from pending to either confirmed or rejected
const updateOrder = catchAsync(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndUpdate(orderId, req.body);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order status changed successfully",
    data: {
      order,
    },
  });
});

//get orders history of user
const orderhistory = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const order = await Order.find({
    orderBy: user_id,
  }).populate("ownedBy productId");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Order history recieved successfully",
    data: {
      order,
    },
  });
});

module.exports = {
  postOrder,
  getOrders,
  updateOrder,
  orderhistory,
};
