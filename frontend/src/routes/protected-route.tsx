import React from "react";
import useAuth from "../hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";


interface ProtectedRouteProps {
    allowedRoles?: string[];
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles}) => {
    const {user,token} = useAuth();
  
    if (!token) {
        return (<Navigate to="/error/unautenticated" />);
    }
    //currently user roles will not be available at this time
    //in order to fix this, user could be saved in localStorage
    // if((allowedRoles)&&(!allowedRoles.includes(user.role))){
    //     return (<Navigate to="/error/unauthorized" />);
    // }
    return (
        <Outlet/>
    );
  };

export default ProtectedRoute;