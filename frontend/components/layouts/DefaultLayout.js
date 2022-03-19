import React from "react";
import Link from "next/link";
import Head from "next/head";
import Unauthlinks from "../UnAuthLinks";
import LogoutButton from "../LogoutButton";
const DefaultLayout = (props) => {
  return (
    <>
      <Head>
        <title>Local Travel</title>
      </Head>

      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Home</a>
          </Link>

          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {!props.auth ? <Unauthlinks /> : <LogoutButton />}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
