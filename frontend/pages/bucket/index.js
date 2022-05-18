import { useState, useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Order from "../../components/Order";
import Part from "../../components/Part";
import Partinorder from "../../components/PartInOrder";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/orders`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Cookie: ctx.req.headers.cookie,
      },
    }
  );
  const content = await orders.json();
  return {
    props: { data: content },
  };
};

const Index = ({ data }) => {
  const router = useRouter();
  async function payOrder(orderId) {
    const orderPayment = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order/pay/${orderId}`,
      {
        method: "GET",
      }
    );
    if (orderPayment.ok) {
      const redirectUrl = await orderPayment.text();
      console.log(redirectUrl);
      router.push(redirectUrl);
    }
  }
  async function cancelOrder() {
    const orderCancel = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
  }
  return (
    <DefaultLayout>
      <div>{JSON.stringify(data)}</div>
      <div>
        {data.orders.map((order, i) => {
          return (
            <Order {...order} key={i}>
              {order.buckets.map((item, j) => {
                return <Partinorder {...item} key={j} />;
              })}
              <button onClick={() => payOrder(order.id)}>Pay for order</button>
              <button onClick={() => cancelOrder()}>Cancel order</button>
            </Order>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default Index;
