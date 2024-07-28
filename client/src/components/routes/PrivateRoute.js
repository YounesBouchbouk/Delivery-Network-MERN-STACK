import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useFindUser from "../../hooks/useFindUser";
import Loading from "../Loading";

const PrivateRoute = () => {
  const { user, isLoanding } = useFindUser();

  if (isLoanding) {
    return <Loading />;
  }
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (user) {
    return user.role === "user" ? <Outlet /> : <Navigate to="/login" />;
  }
  //redirect if there is no user

  return <Navigate to="/login" />;
};

export default PrivateRoute;
