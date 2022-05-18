const orderController = require("../controllers/user/orderController");

module.exports = (app) => {
  app.get("/api/order/:id", orderController.getOrderById);
  app.delete("/api/order", orderController.cancelOrder);
  app.get("/api/orders", orderController.getOrderFromUserCookie);
  app.get("/api/order/pay/:orderId", orderController.payForOrder);
};
