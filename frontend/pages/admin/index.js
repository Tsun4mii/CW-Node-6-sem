import React from "react";
import Adminsidebar from "../../components/admin_components/AdminSidebar";
import Adminlayout from "../../components/layouts/AdminLayout";
import withAuthAdmin from "../../components/HOC/withAuthAdmin";
const Index = () => {
  return <Adminsidebar />;
};

export default withAuthAdmin(Index);
