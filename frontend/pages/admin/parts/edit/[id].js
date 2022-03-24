import React, { useState } from "react";
import Adminsidebar from "../../../../components/admin_components/AdminSidebar";

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts/getById`,
    {
      method: "POST",
      body: JSON.stringify({
        id: context.query.id,
      }),
    }
  );
  const content = await response.json();
  return {
    props: { data: content },
  };
};

const Edit = ({ data }) => {
  const [updateName, setUpdateName] = useState(data.part.name);
  const [updatePrice, setUpdatePrice] = useState(data.part.price);

  const submit = async (e) => {
    e.preventDefault();
    console.log(data.part.id + " " + updateName + " " + updatePrice);
    const id = data.part.id;
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts/edit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          updateName,
          updatePrice,
        }),
      }
    );
    const content = await request.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Part has been updated");
  };
  return (
    <Adminsidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit}>
          <h1>Part update</h1>
          <label htmlFor="name">Name</label>
          <input
            value={updateName}
            name="name"
            className="form-control"
            required
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <label htmlFor="description">Price</label>
          <input
            value={updatePrice}
            name="description"
            className="form-control"
            required
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
          <button type="submit" className="btn btn-info">
            update
          </button>
        </form>
      </div>
    </Adminsidebar>
  );
};

export default Edit;
