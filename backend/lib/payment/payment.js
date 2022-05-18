const stripe = require("stripe")(
  "sk_test_51KiG0DIP4kUO23FbwmEU6Pzhq3hsWTVyN7KhMrZ54Uj3kEi2dConLwcQlSDT1lmp4ReIAkeHKI7lwpwSEDD5xdnx00q4bEaEO6"
);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const paymentOrder = async (orderId) => {
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

  const LineItems = convertToStripeItemList(order);

  return await stripePayment(LineItems, orderId);
};

const convertToStripeItemList = (order) => {
  let stripeLineItems = [];
  order.buckets.forEach((item) => {
    const stripeItem = {
      currency: "usd",
      amount: item.part.price,
      name: item.part.name,
      quantity: item.quantity,
    };

    stripeLineItems.push(stripeItem);
  });
  return stripeLineItems;
};

const stripePayment = async (items, orderId) => {
  let date = new Date();
  let now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours() + 1,
    date.getUTCMinutes(),
    date.getUTCSeconds() + 10
  );
  const done_utc = new Date(now_utc);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items,
    expires_at: now_utc / 1000,
    customer_email: "random@mail.com",
    cancel_url:
      "http://localhost:3000/api/payment/stripe-payment-cancel/" + orderId,
    success_url:
      "http://localhost:3000/api/payment/stripe-payment-success/" + orderId,
  });
  return session.url;
};

module.exports = {
  paymentOrder,
};
