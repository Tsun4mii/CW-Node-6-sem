import { useState } from "react";
import Adminsidebar from "../../../components/admin_components/AdminSidebar";
import Searchbar from "../../../components/Search/SearchBar";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/marks`,
    {
      method: "GET",
    }
  );
  const content = await response.json();
  console.log(content);
  return {
    props: { marks: content },
  };
};

const Add = ({ marks }) => {
  const [name, setName] = useState("");
  const [markId, setMarkId] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    const request = await fetch("/v1/entities/models/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        markId: markId,
      }),
    });
    const content = await request.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Car Model added");
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
          <label htmlFor="markId">Mark Id</label>
          <input
            name="markId"
            className="form-control"
            required
            onChange={(e) => setMarkId(e.target.value)}
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
