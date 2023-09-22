const Item = require("../models/itemModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//GET ALL PRODUCTS by customer
const getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find({});
  if (!items) {
    return next(new AppError("Cannot find the items", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "All items fetched successfully.",
    data: {
      items,
    },
  });
});

//Get the products that are owned by the shopkeepers only
const getProductsOfShop = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const items = await Item.find({ ownedBy: user_id });

  if (!items) {
    return next(
      new AppError("Cannot find the items that are owned by the user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: { items },
  });
});

//CREATE PRODUCT OWNED BY SHOPKEEPER
const createItem = catchAsync(async (req, res, next) => {
  const data = req.body;
  const user_id = req.user._id;

  const body = { ...data, ownedBy: user_id };

  console.log(body);
  const items = await Item.create(body);

  if (!items) {
    return next(
      new AppError("Cannot create the product owned by the user ", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Product created successfully",
    data: {
      items,
    },
  });
});

//GET PRODUCT BY ID
const getItem = catchAsync(async (req, res, next) => {
  const { id: itemID } = req.params;
  const item = await Item.findOne({ _id: itemID });

  if (!item) {
    return next(new AppError(`No item with id : ${itemID}`, 404));
  }

  res.status(200).json({
    status: "success",
    message: "Item found successfully",
    data: item,
  });
});

//UPDATE ITEM
const updateItem = catchAsync(async (req, res, next) => {
  const { id: itemID } = req.params;
  const item = await Item.findByIdAndUpdate({ _id: itemID }, req.body);
  if (!item) {
    return next(new AppError(`No item with id : ${itemID}`, 404));
  }
  res.status(200).json({
    status: "success",
    message: "Item successfully updated",
    data: item,
  });
});

//DELETE ITEM BY ID
const deleteItem = catchAsync(async (req, res, next) => {
  const { id: itemID } = req.params;

  const item = await Item.findByIdAndDelete({ _id: itemID });
  //if no product is found throw an error
  if (!item) {
    return next(new AppError("No item found", 404));
  }
  res.status(201).json({
    status: "success",
    message: "Item deleted succesfully",
  });
});

//Add to cart
const bookProduct = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: itemID } = req.params;

  const item = await Item.findByIdAndUpdate(
    itemID,
    {
      purchasedBy: userId,
    },
    { new: true }
  );
  if (!item) {
    return next(
      new AppError(
        "Cannot book the product that user is trying to purchase",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: "item successfully added to cart",
    data: {
      item,
    },
  });
});

//get booked product
const bookedProducts = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const items = await Item.find({ purchasedBy: user_id });

  if (!items) {
    return next(
      new AppError("Cannot get the booked products in the cart", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: { items },
  });
});

//remove item from the cart
const removeCartProduct = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: itemID } = req.params;

  const item = await Item.findByIdAndUpdate(
    itemID,
    {
      purchasedBy: null,
    },
    { new: true }
  );
  if (!item) {
    return next(new AppError("Cannot remove this item from the cart", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product successfully removed from cart",
    data: {
      item,
    },
  });
});

module.exports = {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
  bookProduct,
  bookedProducts,
  getProductsOfShop,
  removeCartProduct,
};
