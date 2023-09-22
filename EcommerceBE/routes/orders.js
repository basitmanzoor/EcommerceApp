const express = require("express");

const authController = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");
const router = express.Router();

router
  .route("/postorder/:id")
  .post(
    authController.protect,
    authController.restrictTo("customer"),
    orderController.postOrder
  );

router
  .route("/getOrders")
  .get(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    orderController.getOrders
  );

router
  .route("/orderhistory")
  .get(
    authController.protect,
    authController.restrictTo("customer"),
    orderController.orderhistory
  );
router
  .route("/updateorder/:id")
  .patch(
    authController.protect,
    authController.restrictTo("shopkeeper"),
    orderController.updateOrder
  );

module.exports = router;
