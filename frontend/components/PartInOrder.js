import React from "react";
import Link from "next/link";
import styles from "../styles/Part.module.css";
import { BsFillTrashFill } from "react-icons/bs";

const Partinorder = (props) => {
  async function deleteFromOrder(id) {
    console.log(id);
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/bucket`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const content = await request.json();
    return content;
  }
  return (
    <div key={props.part.id} className={styles.product}>
      <h3>{props.part.name}</h3>
      <p>Price: {props.part.price}$</p>
      <p>In stock: {props.part.in_stock}</p>
      <div className="d-flex">
        <Link href={`/part/${props.part.id}`}>
          <button className={styles.product_button}>More</button>
        </Link>
        <br />
        <button
          className={styles.product_button}
          onClick={() => deleteFromOrder(props.id)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Partinorder;
