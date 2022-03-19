import React from "react";
import Router from "next/router";
import { tokenAuthenticate, isUser } from "../../lib/auth/auth-helpers";

const withAuthUser = (Component) => {
  class WithAuth extends React.Component {
    async componentDidMount() {
      const content = await tokenAuthenticate(localStorage.getItem("token"));
      if (!isUser(content.user)) {
        return Router.push("/signin");
      }
    }
    render() {
      return <Component />;
    }
  }
  return WithAuth;
};

export default withAuthUser;
