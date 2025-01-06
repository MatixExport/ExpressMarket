import { isExpired } from "react-jwt";
import { refreshAccessToken } from ".";
import { Config } from "../config";


type FetchData = {
  method: string;
  mode: RequestMode;
  cache: RequestCache;
  credentials: RequestCredentials;
  headers: HeadersInit;
  redirect: RequestRedirect;
  referrerPolicy: ReferrerPolicy;
  body?: string;
};



const getDefaultRequest = (method:string,data?:any)=>{
  const fetchData : FetchData = {
  method: method,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  };
  if (data) {
  fetchData.headers = {
    ...fetchData.headers,
    'Content-Type': 'application/json',
  };
  fetchData['body'] = JSON.stringify(data);
  }
  return fetchData
}



export const fetchBackendLookup = async (method:string,endpoint:string,data?:any)=> {
  const url = Config.SERVER_URL + endpoint;
  const fetchData = getDefaultRequest(method,data)
  const response = await fetch(url, fetchData);
  const responseBody = await response.json();



  return {status:response.status,body:responseBody}
} 

export const tokenFetchBackendLookup = async (method:string,endpoint:string,data?:any)=>{
  const url = Config.SERVER_URL + endpoint;
  const fetchData = getDefaultRequest(method,data)
  
  let token = ""
  try {
    token = await getValidAccessToken();
  } catch {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    console.log("no valid token")
  }  

  fetchData.headers = {
    ...fetchData.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, fetchData);
  const responseBody = await response.json();
  return {status:response.status,body:responseBody}
  
}


  const getValidAccessToken = async ()=>{
    let accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    if((accessToken === null)||(refreshToken === null)){
      throw new Error("Token Invalid")
    }
    if(isExpired(accessToken)){
      const renewalResponse = await refreshAccessToken(refreshToken);
      if(renewalResponse.status >= 500){
        throw new Error("Token Invalid")
      }
      accessToken = renewalResponse.body.data.access
      if(accessToken === null){
        throw new Error("Token Invalid")
      }
      localStorage.setItem("access",accessToken)
    }
    return accessToken
  }
