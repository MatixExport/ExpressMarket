import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

import {Form, FormField,} from "@/components/ui/form"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import LoginSchema from "@/types/login-schema"
import FormFieldRender from "./form-field-render"
import {z} from "zod"
import {requestLogin} from "@/lookup";
import useAuth from "@/hooks/use-auth";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import { Link } from "react-router-dom";


const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">)=> {

   const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    reValidateMode:"onChange",
    defaultValues: {
      login: "",
      password:""
    },
  })

  const {user,login,logout} = useAuth()
  const [globalError,setGlobalError] = useState<string|null>(null)
 
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setGlobalError(null)
    requestLogin(values.login,values.password).then((res)=>{
      console.log(res.status)
      if(res.status >= 400){
        setGlobalError(res.body.error.message[0].message)
      }else{
        console.log(res.body.data)
        login(res.body.data)
      }
    })

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
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
                    name="password"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Password"
                        type="password"
                        placeholder="example"
                        field={field}
                        />
                    )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Label className="text-red-900 font-bold" >
                {globalError ? globalError : ""}
              </Label>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm;
