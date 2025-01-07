import { z, ZodType } from "zod"; // Add new import

export type RegisterFormData = {
    login: string;
    password: string;
    email: string;
    phone: string;
    repeatPassword:string;
  };


const RegisterSchema: ZodType<RegisterFormData> = z
 .object({
   login:
    z.string()
    .min(2,{message:"Login is too short"})
    .max(12,{message:"Login is to long"}),
   password: z
     .string()
     .min(8, { message: "Password is too short" })
     .max(20, { message: "Password is too long" }),
    repeatPassword:z
    .string(),
    email: z
        .string()
        .email(),
    phone: z
    .string()
    .min(9)
    .max(9)
    
 }).refine((data)=>data.password === data.repeatPassword,{
    message:"Passwords do not match",
    path:['repeatPassword']
 })
 




 export default RegisterSchema   