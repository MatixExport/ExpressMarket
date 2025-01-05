import React, { Component, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";


interface ProtectedRouteProps {
    allowedRoles?: string[];
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles}) => {
    const {user} = useAuth();
  
    if (!user) {
        return (<Navigate to="/error/unautenticated" />);
    }
    if((allowedRoles)&&(!allowedRoles.includes(user.role))){
        return (<Navigate to="/error/unauthorized" />);
    }
    return (
        <Outlet/>
    );
  };






  
export default ProtectedRoute;