import React from "react";
import Link from "next/link";
const Parts = () => {
  return (
    <>
      <li className="nav-item">
        <Link href="/admin/parts">
          <a className="nav-link activate text-light">Parts</a>
        </Link>
      </li>
    </>
  );
};

export default Parts;
