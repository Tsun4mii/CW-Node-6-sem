import React from "react";
import Link from "next/link";

const Marks = () => {
  return (
    <>
      <li className="nav-item">
        <Link href="/admin/marks">
          <a className="nav-link activate text-light">Marks</a>
        </Link>
      </li>
    </>
  );
};

export default Marks;
