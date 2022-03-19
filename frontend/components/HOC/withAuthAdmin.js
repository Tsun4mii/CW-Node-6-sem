import React from "react";
import Router from "next/router";
import { tokenAuthenticate, isAdmin } from "../../lib/auth/auth-helpers";

const withAuthAdmin = (Component) => {
  class WithAuth extends React.Component {
    async componentDidMount() {
      const content = await tokenAuthenticate(localStorage.getItem("token"));
      if (!isAdmin(content.user)) {
        return Router.replace("/");
      }
    }
    render() {
      return <Component />;
    }
  }
  return WithAuth;
};

export default withAuthAdmin;
