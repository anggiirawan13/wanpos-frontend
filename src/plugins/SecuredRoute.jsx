import React from "react";
import { Navigate, Route } from "react-router-dom";
import Storage from "../Storage/storage";
import jwtDecode from "jwt-decode";

const SecuredRoute = ({ element, role }) => {
  const auth = jwtDecode(Storage.getLogin());

  if (!auth) {
    return <Navigate to="/login" />;
  } else if (auth.role === role || role === "") {
    return element;
  } else {
    return history.back();
  }
};

export default SecuredRoute;
