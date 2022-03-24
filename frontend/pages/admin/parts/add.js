import { useState } from "react";
import Adminsidebar from "../../../components/admin_components/AdminSidebar";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const request = await fetch("/v1/entites/part/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock,
        img_path: img,
      }),
    });
    const content = await request.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Part added");
  };

  return (
    <Adminsidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit}>
          <h1>Add Part</h1>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="form-control"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            className="form-control"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="stock">Stock</label>
          <input
            name="stock"
            className="form-control"
            required
            onChange={(e) => setStock(e.target.value)}
          />
          <label htmlFor="img">Img</label>
          <input
            name="img"
            className="form-control"
            required
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit" className="btn btn-info">
            Add part
          </button>
        </form>
      </div>
    </Adminsidebar>
  );
};

export default Add;
