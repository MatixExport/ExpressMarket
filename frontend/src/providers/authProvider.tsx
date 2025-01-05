import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ReactNode } from 'react'
import { TokenPair } from "../types/TokenPairType";
import { fetchUserData } from "../lookup";


const AuthContext = createContext({});

const AuthProvider = ({ children }:any) => {
  const [user,setUser] = useState(null)

  const login = (authData:TokenPair)=>{
    localStorage.setItem("access",authData.access);
    localStorage.setItem("refresh",authData.refresh);

    fetchUserData().then((response)=>{
      if(response.status < 500){
          setUser(response.body.data)
      }
    })
  }

  const logout = ()=>{
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null)
  }
  

  };
  



  