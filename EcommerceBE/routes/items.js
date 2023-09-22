const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("customer", "admin"),
    itemsController.getAllItems
  )
  .post(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    itemsController.createItem
  );

router
  .route("/findForShopkeeper")
  .get(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    itemsController.getProductsOfShop
  );

router
  .route("/bookedproducts")
  .get(
    authController.protect,
    authController.restrictTo("customer"),
    itemsController.bookedProducts
  );

router
  .route("/:id")
  .get(authController.protect, itemsController.getItem)
  .patch(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    itemsController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    itemsController.deleteItem
  );

router
  .route("/book/:id")
  .patch(
    authController.protect,
    authController.restrictTo("customer"),
    itemsController.bookProduct
  );

router
  .route("/removeCartProduct/:id")
  .patch(
    authController.protect,
    authController.restrictTo("customer"),
    itemsController.removeCartProduct
  );
module.exports = router;
