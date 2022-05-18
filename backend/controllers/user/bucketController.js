const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bucketService = require("../../Services/bucketService");

module.exports = {
  async addPartToBucket(req, res) {
    let { partId } = req.body;
    let userId = req.cookies.userId;
    if (!req.cookies.orderId) {
      const newOrder = await prisma.order.create({
        data: {
          userId: Number.parseInt(userId),
          totalCost: 0,
        },
      });

      let orderCookie = newOrder.id;
      const bucketItem = await prisma.bucket.create({
        data: {
          partId: Number.parseInt(partId),
          orderId: orderCookie,
          quantity: 1,
        },
      });
      const partInOrder = await prisma.part.findFirst({
        where: {
          id: bucketItem.partId,
        },
      });
      const orderUpdatePrice = await prisma.order.update({
        where: {
          id: newOrder.id,
        },
        data: {
          totalCost: partInOrder.price,
        },
      });
      res.cookie("orderId", orderCookie);
      return res.status(200).json({ bucketItem });
    }

    let ordId = req.cookies.orderId;
    const bucketExist = await prisma.bucket.findFirst({
      where: {
        partId: Number.parseInt(partId),
        orderId: Number.parseInt(ordId),
      },
    });
    if (bucketExist) {
      const updatedBucketIncr = await prisma.bucket.update({
        where: {
          id: bucketExist.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return res.status(200).json({ updatedBucketIncr });
    } else {
      const bucketItemOrdCr = await prisma.bucket.create({
        data: {
          partId: Number.parseInt(partId),
          orderId: Number.parseInt(ordId),
        },
      });
      const partInOrderExist = await prisma.part.findFirst({
        where: {
          id: bucketItemOrdCr.partId,
        },
      });
      const orderUpdatePriceExist = await prisma.order.update({
        where: {
          id: Number.parseInt(ordId),
        },
        data: {
          totalCost: {
            increment: partInOrderExist.price,
          },
        },
      });
      return res.status(200).json({ bucketItemOrdCr });
    }
  },

  async deleteItem(req, res) {
    let { id } = req.body;
    let deleted = {};
    const bucket = await prisma.bucket.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    if (bucket.quantity > 1) {
      deleted = await prisma.bucket.update({
        where: {
          id: bucket.id,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      let result = bucketService.recountOrderPrice(bucket.orderId);
      return res.status(200).json({ result });
    } else {
      deleted = await prisma.bucket.delete({
        where: {
          id: Number.parseInt(id),
        },
      });
      res.status(200).json({ deleted });
    }
  },
};
