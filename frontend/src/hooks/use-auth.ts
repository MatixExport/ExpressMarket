import { AuthContext } from "../providers/auth-Provider";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext);
  };

export default useAuth