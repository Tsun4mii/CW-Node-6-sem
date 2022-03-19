import React from "react";
import Adminsidebar from "../admin_components/AdminSidebar";
const Adminlayout = (props) => {
  return (
    <div className="row mw-100">
      <div className="col-2">
        <Adminsidebar></Adminsidebar>
      </div>
      <main className="col-9">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Adminlayout;
