import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useFindUser from "../../hooks/useFindUser";
import Loading from "../Loading";

const DeliveryRoute = () => {
  // const auth = isDelivery(); // determine if authorized, from context or however you're doing it
  const { user, isLoanding } = useFindUser();

  if (isLoanding) {
    return <Loading />;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (user) {
    return user.role === "deliverycompanie" ? (
      <Outlet />
    ) : (
      <Navigate to="/Home" />
    );
  }
  //redirect if there is no user

  return <Navigate to="/login" />;
};

export default DeliveryRoute;
