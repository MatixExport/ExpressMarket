import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TokenPair } from "../types/token-pair-type";
import { fetchUserData } from "../lookup";
import { User } from "../types/user-type";

interface AuthContextValue {
  user: User | null; 
  login: (authData:TokenPair) => void; 
  logout: () => void;
  token: string | null
  // getValidAccessToken?: () => Promise<string>;
}

export const AuthContext = createContext<AuthContextValue>({
  user:null,
  login:()=>{},
  logout:()=>{},
  token:""
});

const AuthProvider = ({ children }:any) => {
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem('refresh'))

  const setUserData = ()=>{
    fetchUserData().then((response)=>{
      if(response.status < 400){
          setUser(response.body.data)
      }else{
        logout()
      }
    })
  }

  const login = (authData:TokenPair)=>{
    localStorage.setItem("access",authData.access);
    localStorage.setItem("refresh",authData.refresh);
    setToken(authData.refresh)
    setUserData()
  }

  const logout = ()=>{
    console.log("Singing out")
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null)
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
      token
      // getValidAccessToken
    }),
    [user,token]
  );

  return(
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
  };
  
export default AuthProvider



  