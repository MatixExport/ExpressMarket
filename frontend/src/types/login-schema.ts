import { z, ZodType } from "zod"; // Add new import
import { FieldError, UseFormRegister } from "react-hook-form";



export type LoginFormData = {
    login: string;
    password: string;
  };


const LoginSchema: ZodType<LoginFormData> = z
 .object({
   login:
    z.string()
    .min(2,{message:"Login is too short"})
    .max(12,{message:"Login is to long"}),
   password: z
     .string()
     .min(8, { message: "Password is too short" })
     .max(20, { message: "Password is too long" }),
 });

 export default LoginSchema