import React from "react";
import styles from "../styles/Part.module.css";
import Link from "next/link";

const Part = (props) => {
  const { id, name, price, in_stock } = props;
  return (
    <div key={id} className={styles.product}>
      <h3>{name}</h3>
      <p>Price: {price}$</p>
      <p>In stock: {in_stock}</p>
      <div>
        <Link href={`/part/${id}`}>
          <button className={styles.product_button}>More</button>
        </Link>
        <br />
        <button className={styles.product_button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Part;
