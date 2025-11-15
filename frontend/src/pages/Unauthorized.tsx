import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md text-center p-6">
                <CardHeader>
                    <div className="mx-auto bg-secondary rounded-full p-4 w-fit">
                        <ShieldAlert className="h-12 w-12 text-destructive" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <CardTitle className="text-3xl font-bold">Access Denied</CardTitle>
                    <CardDescription>
                        You do not have the necessary permissions to view this page. Please contact an administrator if you believe this is an error.
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

export default Unauthorized;