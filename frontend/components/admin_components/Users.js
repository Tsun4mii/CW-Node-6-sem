import React from "react";
import Link from "next/link";
const Users = () => {
  return (
    <>
      <li className="nav-item">
        <Link href="/admin">
          <a className="nav-link activate text-light">Users</a>
        </Link>
      </li>
    </>
  );
};

export default Users;
