import React, { ReactNode } from "react";
import NavbarOverlay from "./navbar-overlay"
import { useLocation } from "react-router-dom";



interface RestrictedNavbarOverlayProps{
  children:ReactNode,
}

const disabledPaths = ['/auth/login','/auth/register']

const RestrictedNavbarOverlay : React.FC<RestrictedNavbarOverlayProps> =  ({children})=> {

    const location = useLocation()
    if(disabledPaths.includes(location.pathname)){
        return (
            <React.Fragment>
                 {children}
            </React.Fragment>
        )
    }

    return (
        <NavbarOverlay>
            {children}
        </NavbarOverlay>
    )
}

export default RestrictedNavbarOverlay;