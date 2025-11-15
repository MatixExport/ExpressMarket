import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldRender from "./form-field-render"
import { z } from "zod"
import { register } from "@/lookup";
import ErrorMessage from "@/types/error-message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import RegisterSchema from "@/types/register-schema";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    reValidateMode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      email: "",
      phone: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);
    setGlobalError(null);
    register(values.login, values.password, values.email, values.phone).then((res) => {
      if (res.status >= 400) {
        res.body.error.message.forEach((errorMessage: ErrorMessage) => {
          if (errorMessage.field === "global") {
            setGlobalError(errorMessage.message);
          } else {
            form.setError(errorMessage.field as keyof z.infer<typeof RegisterSchema>, { type: "server", message: errorMessage.message });
          }
        });
      } else {
        navigate("/auth/login");
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your data below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="login"
              control={form.control}
              render={({ field }) => (
                <FormFieldRender
                  label="Username"
                  type="text"
                  placeholder="Your username"
                  field={field}
                />
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormFieldRender
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  field={field}
                />
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormFieldRender
                  label="Phone number"
                  type="text"
                  placeholder="123456789"
                  field={field}
                />
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormFieldRender
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  field={field}
                />
              )}
            />
            <FormField
              name="repeatPassword"
              control={form.control}
              render={({ field }) => (
                <FormFieldRender
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm your password"
                  field={field}
                />
              )}
            />
            {globalError && (
              <Label className="text-sm font-medium text-destructive">
                {globalError}
              </Label>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm;
