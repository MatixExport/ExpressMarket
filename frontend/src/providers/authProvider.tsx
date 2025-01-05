import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TokenPair } from "../types/TokenPairType";
import { fetchUserData } from "../lookup";
import { User } from "../types/UserType";
import { isExpired } from "react-jwt";
import { refreshAccessToken } from "../lookup";

interface AuthContextValue {
  user: User | null; 
  login: (authData:TokenPair) => void; 
  logout: () => void;
  // getValidAccessToken?: () => Promise<string>;
}

export const AuthContext = createContext<AuthContextValue>({
  user:null,
  login:()=>{},
  logout:()=>{}
});

const AuthProvider = ({ children }:any) => {
  const [user,setUser] = useState(null)

  const setUserData = ()=>{
    fetchUserData().then((response)=>{
      if(response.status < 500){
          setUser(response.body.data)
      }
    })
  }

  const login = (authData:TokenPair)=>{
    localStorage.setItem("access",authData.access);
    localStorage.setItem("refresh",authData.refresh);
    setUserData()
  }

  const logout = ()=>{
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null)
  }

  // const getValidAccessToken = async ()=>{
  //   let accessToken = localStorage.getItem("access");
  //   const refreshToken = localStorage.getItem("refresh");
  //   if((accessToken === null)||(refreshToken === null)){
  //     throw new Error("Token Invalid")
  //   }
  //   if(isExpired(accessToken)){
  //     const renewalResponse = await refreshAccessToken(refreshToken);
  //     if(renewalResponse.status >= 500){
  //       throw new Error("Token Invalid")
  //     }
  //     accessToken = renewalResponse.body.data.access
  //     if(accessToken === null){
  //       throw new Error("Token Invalid")
  //     }
  //     localStorage.setItem("access",accessToken)
  //   }
  //   return accessToken
  // }

  useEffect(()=>{
    // getValidAccessToken()
    // .then((access)=>{
    //   localStorage.setItem("access",access)
    //   setUserData()
    // })
    // .catch((error)=>{
    //   logout()
    // })
    setUserData()
  },[])

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      // getValidAccessToken
    }),
    [user]
  );

  return(
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
  };
  
export default AuthProvider



  