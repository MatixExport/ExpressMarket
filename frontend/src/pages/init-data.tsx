import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {InitDataType } from "@/types/init-data-schema";
import InitSchema from "@/types/init-data-schema";
import { Label } from "@radix-ui/react-label";
import { useRef, useState } from "react";
import { z, ZodType } from "zod";
import { addBulkProducts } from "@/lookup";
import { Response } from "@/types/response-type";
import ErrorMessage from "@/types/error-message";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/confirm-dialog";


const InitData =()=> {
    const [initData, setInitData] = useState<InitDataType>()
    const filename = useRef("")
    const [errors,setErrors] = useState<string[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setIsLoading(true)
        setErrors([])
        if(event.target.files){
            const files = Array.from(event.target.files)
            const file = files[0]
            filename.current = file.name
            if(file.type != "application/json"){
                setErrors(["File must be of type JSON"])
                return
            }
            file.text().then(
                (value)=>{
                    try {
                        const parsedJson = JSON.parse(value)
                        const parsedInitData = InitSchema.parse(parsedJson);
                        setInitData(parsedInitData)
                        setIsLoading(false)
                      } catch (error) {
                          if (error instanceof z.ZodError) {
                            setErrors(
                                error.issues.map((value)=>{
                                    return `${value.path} ${value.message}`
                                })
                            )
                          } else {
                            setErrors(["Unable to parse to json"]);
                        }
                        return
                      }
                }
            )
        }
      }

    const handleSubmit = () =>{
        if(!initData){
            return
        }
        setIsLoading(true)
        addBulkProducts(initData).then((response : Response)=>{
            if(response.status >= 400){
                console.log(response.body.error.message)
                setErrors(
                    response.body.error.message.map((error:ErrorMessage)=>
                        `${error.field}: ${error.message}`
                    )
               
                )
                
            }
            else{
                setIsLoading(false)
                navigate("/")
            }

        })
        
    }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      
         <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Init products</Label>
            <Input id="picture" type="file" onChange={handleChange} />
            <ConfirmDialog
                title="Product Initalization"
                text={`Are you sure you want to initialize database with the content of  ${filename.current}`}
                onConfirm={()=>{handleSubmit()}}
            >
                <Button disabled={((errors.length > 0) || (isLoading))}>
                    Upload initial products
                </Button>
            </ConfirmDialog>
           
            {errors.map((error)=>(
            <p className="text-red-600 mb-2 mt-4">
                {error}
            </p>
        ))}
        </div>
      </div>
    </div>
  )
}

export default InitData