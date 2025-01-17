import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

import {Form, FormField,} from "@/components/ui/form"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import FormFieldRender from "./form-field-render"
import {z} from "zod"
import { register } from "@/lookup";
import ErrorMessage from "@/types/error-message";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import RegisterSchema from "@/types/register-schema";
import { Link } from "react-router-dom";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">)=> {

   const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    reValidateMode:"onChange",
    defaultValues: {
      login: "",
      password:""
    },
  })

  const navigate = useNavigate()
  const [globalError,setGlobalError] = useState<string|null>(null)
 
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setGlobalError(null)
    register(values.login,values.password,values.email,values.phone).then((res)=>{
      if(res.status >= 400){
        console.log("Server-side validation error")
        res.body.error.message.forEach((errorMessage:ErrorMessage)=>{
            if(errorMessage.field == "global"){
                setGlobalError(errorMessage.message)
                return
            }else{
              form.setError(errorMessage.field, {type:"server",message: errorMessage.message})
            }
        })

      }else{

        console.log(res.body.data)
        navigate("/auth/login")
      }
    })

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your data below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                    name="login"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Username"
                        type="text"
                        placeholder="example"
                        field={field}
                        />
                    )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                    name="email"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Email"
                        type="text"
                        placeholder="email"
                        field={field}
                        />
                    )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                    name="phone"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Phone number"
                        type="textS"
                        placeholder="phone number"
                        field={field}
                        />
                    )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                    name="password"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Password"
                        type="password"
                        placeholder="password"
                        field={field}
                        />
                    )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                    name="repeatPassword"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Confirm password"
                        type="password"
                        placeholder="password"
                        field={field}
                        />
                    )}
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <Label className="text-red-900 font-bold" >
                {globalError ? globalError : ""}
              </Label>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm;
