

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


import { Button } from "@/components/ui/button";


import { AlertTriangle } from "lucide-react";


import { Link } from "react-router-dom";





const NotFound: React.FC = () => {


    return (


        <div className="flex items-center justify-center min-h-[70vh]">


            <Card className="w-full max-w-md text-center">


                <CardHeader>


                    <div className="mx-auto bg-secondary rounded-full p-4 w-fit">


                        <AlertTriangle className="h-12 w-12 text-destructive" />


                    </div>


                </CardHeader>


                <CardContent className="space-y-2">


                    <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>


                    <CardDescription>


                        Sorry, the page you are looking for does not exist or has been moved.


                    </CardDescription>


                </CardContent>


                <CardFooter>


                    <Button asChild className="w-full">


                        <Link to="/">Go to Homepage</Link>


                    </Button>


                </CardFooter>


            </Card>


        </div>


    );


};





export default NotFound;

