import {
  useEffect,
  useState,
} from "react";

import { Response } from "../types/response-type";


const useQuery = <T>( queryFn : () => Promise<Response>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let canceled = false;
    const fetchData = async () => {
      setIsError(false);


    const result = await queryFn();
    if(!canceled){
      if(result.status >= 400){
        setIsError(true)
      }else{
        setData(result.body.data as T);
      }
      setIsLoading(false);
    }
    };
    fetchData();
    return () => {
      canceled = true;
    };
  }, []);

  return [data, isLoading, isError] as const;
};


export default useQuery