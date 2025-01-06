import React from "react";
import useAuth from "../hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";


const UnauthenticatedOnlyRoute: React.FC = () => {
    const {user} = useAuth();
  
    if (user !== null) {
        return (<Navigate to="/" />);
    }
    return (
        <Outlet/>
    );
  };

export default UnauthenticatedOnlyRoute;