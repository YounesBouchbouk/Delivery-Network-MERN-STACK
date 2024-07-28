import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useFindUser from "../../hooks/useFindUser";
import Loading from "../Loading";

const AdminRoute = () => {
  const { user, isLoanding } = useFindUser();
  // console.log("hadi mn adminnnn Route ", user.role);

  if (isLoanding) {
    return <Loading />;
  }
  // const auth = isAdmin(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (user) {
    return user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
  }
  //redirect if there is no user

  return <Navigate to="/login" />;
};

export default AdminRoute;
