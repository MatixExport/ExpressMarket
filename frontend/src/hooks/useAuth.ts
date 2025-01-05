import { AuthContext } from "../providers/authProvider";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext);
  };

export default useAuth