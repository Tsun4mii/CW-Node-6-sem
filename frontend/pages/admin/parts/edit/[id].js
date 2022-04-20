import React, { useState } from "react";
import Adminsidebar from "../../../../components/admin_components/AdminSidebar";

export const getServerSideProps = async (context) => {
  console.log(context.query.id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts/getById`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    let formData = new FormData();
    console.log(data.part.id + " " + updateName + " " + updatePrice);
    const id = data.part.id;
    formData.append("id", id);
    formData.append("updateName", updateName);
    formData.append("updatePrice", updatePrice);
    let imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append("file", imagedata);
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts/edit`,
      {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        /*body: JSON.stringify({
          id,
          updateName,
          updatePrice,
        }),*/
        body: formData,
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
        <form onSubmit={submit} encType={"multipart/form-data"}>
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
          <div className="d-block">
            <input type="file" name="file" />
          </div>
          <div className="d-inline">
            <img src={data.part.img_path} width={100} height={200} />
          </div>
          <div className="d-inline">
            <button type="submit" className="btn btn-info">
              update
            </button>
          </div>
        </form>
      </div>
    </Adminsidebar>
  );
};

export default Edit;
