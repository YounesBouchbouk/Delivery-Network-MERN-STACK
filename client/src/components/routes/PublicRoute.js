import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate } from "../../data/authfetchapi";
import useFindUser from "../../hooks/useFindUser";
import { UserContext } from "../../hooks/Usercontext";
import Loading from "../Loading";

const PublicRoute = () => {
  const { user, isLoanding } = useFindUser();
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (isLoanding) {
    return <Loading />;
  }

  return user ? (
    <Navigate
      // to={
      //   user.role === "admin "
      //     ? "/admin/Dashboard"
      //       ? user.role === "deliverycompanie"
      //       : "/delivery/Dashboard"
      //     : "/user/Dashboard"
      // }
      to={
        user.role === "admin"
          ? "/admin/dashboard"
            ? user.role === "deliverycompanie"
            : "/delivery/Dashboard"
          : "/user/Dashboard"
      }
    />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
