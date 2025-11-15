import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from "@/types/login-schema"
import FormFieldRender from "./form-field-render"
import { z } from "zod"
import { requestLogin } from "@/lookup";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    reValidateMode: "onChange",
    defaultValues: {
      login: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    setGlobalError(null);
    requestLogin(values.login, values.password).then((res) => {
      if (res.status >= 400) {
        setGlobalError(res.body.error.message[0].message);
      } else {
        login(res.body.data);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username and password below to login to your account.
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
            {globalError && (
              <Label className="text-sm font-medium text-destructive">
                {globalError}
              </Label>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm;
