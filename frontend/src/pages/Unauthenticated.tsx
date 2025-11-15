

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


import { Button } from "@/components/ui/button";


import { LogIn } from "lucide-react";


import { Link } from "react-router-dom";





const Unauthenticated: React.FC = () => {


    return (


        <div className="flex items-center justify-center min-h-screen bg-background">


            <Card className="w-full max-w-md text-center p-6">


                <CardHeader>


                    <div className="mx-auto bg-secondary rounded-full p-4 w-fit">


                        <LogIn className="h-12 w-12 text-primary" />


                    </div>


                </CardHeader>


                <CardContent className="space-y-2">


                    <CardTitle className="text-3xl font-bold">Authentication Required</CardTitle>


                    <CardDescription>


                        You need to be logged in to access this page. Please log in to continue.


                    </CardDescription>


                </CardContent>


                <CardFooter className="flex flex-col gap-4">


                    <Button asChild className="w-full">


                        <Link to="/auth/login">Login</Link>


                    </Button>


                    <Button asChild variant="outline" className="w-full">


                        <Link to="/">Go to Homepage</Link>


                    </Button>


                </CardFooter>


            </Card>


        </div>


    );


};





export default Unauthenticated;

