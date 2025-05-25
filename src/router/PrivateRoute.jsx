import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  // context
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }

  // return code
  return (
    <div>
      <Navigate to={"/login"} state={location.pathname}></Navigate>
    </div>
  );
};

export default PrivateRoute;
