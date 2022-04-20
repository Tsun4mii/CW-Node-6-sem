import { useState } from "react";
import Adminsidebar from "../../../components/admin_components/AdminSidebar";

const Add = () => {
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const request = await fetch("/v1/entities/marks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });
    const content = await request.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Mark added");
  };
  return (
    <Adminsidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit}>
          <h1>Add mark</h1>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="form-control"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn btn-info">
            Add mark
          </button>
        </form>
      </div>
    </Adminsidebar>
  );
};

export default Add;
