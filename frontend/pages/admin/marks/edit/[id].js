import React, { useState } from "react";
import Adminsidebar from "../../../../components/admin_components/AdminSidebar";

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/marks/${context.query.id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const content = await response.json();
  return {
    props: { data: content },
  };
};

const Id = ({ data }) => {
  const [updateName, setUpdateName] = useState(data.mark.carMarkName);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/marks/edit`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updateName,
          id: data.mark.id,
        }),
      }
    );
    const content = await response.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Mark has been updated");
  };
  return (
    <Adminsidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit} encType={"multipart/form-data"}>
          <h1>Mark update</h1>
          <label htmlFor="name">Name</label>
          <input
            value={updateName}
            name="name"
            className="form-control"
            required
            onChange={(e) => setUpdateName(e.target.value)}
          />
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

export default Id;
