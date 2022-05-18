const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const paymentHelper = require("../../lib/payment/payment");

module.exports = {
  async getOrderById(req, res) {
    let orderId = req.params.id;
    const order = await prisma.order.findFirst({
      where: {
        id: Number.parseInt(orderId),
      },
      include: {
        buckets: {
          select: {
            part: true,
            quantity: true,
          },
        },
      },
    });
    res.status(200).json({ order });
  },
  // TODO: Clear cookie after order cancel
  async cancelOrder(req, res) {
    let { orderId } = req.cookies;
    const order = await prisma.order.update({
      where: {
        id: Number.parseInt(orderId),
      },
      data: {
        status: "Canceled",
      },
    });
    res.clearCookie("orderId");
    res.status(200).json({ order });
  },
  async getOrderFromUserCookie(req, res) {
    let userId = req.cookies.userId;
    const orders = await prisma.order.findMany({
      where: {
        userId: Number.parseInt(userId),
      },
      include: {
        buckets: {
          select: {
            part: true,
            id: true,
          },
        },
      },
    });
    res.status(200).json({ orders });
  },
  async payForOrder(req, res) {
    let orderId = req.params.orderId;
    const paymentRedirect = await paymentHelper.paymentOrder(orderId);
    res.send(paymentRedirect);
  },
};
