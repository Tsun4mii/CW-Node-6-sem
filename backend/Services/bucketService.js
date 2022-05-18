const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async createBucketItem(partId, orderId) {
    const bucketItem = await prisma.bucket.create({
      data: {
        partId: Number.parseInt(partId),
        orderId: orderCookie,
      },
    });
    return bucketItem;
  },
  async findPartInOrder(bucketPartId) {
    const partInOrder = await prisma.part.findFirst({
      where: {
        id: bucketPartId,
      },
    });
    return partInOrder;
  },
  async recountOrderPrice(orderId) {
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
    let newPrice = 0;
    for (i = 0; i < order.buckets.length; i++) {
      newPrice += order.buckets[i].part.price * order.buckets[i].quantity;
    }
    const updatedOrder = await prisma.order.update({
      where: { id: Number.parseInt(orderId) },
      data: {
        totalCost: newPrice,
      },
    });
    return updatedOrder;
  },
};
