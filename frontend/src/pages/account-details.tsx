import useAuth from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const AccountDetails = () => {
    const { user } = useAuth();

    if (!user) {
        // Optional: Show a loading state while user data is being fetched
        return (
            <div className="container mx-auto flex justify-center py-10">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto flex justify-center py-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Account Details</CardTitle>
                    <CardDescription>Here is the information associated with your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Login:</span>
                        <span className="font-medium text-foreground">{user.login}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-foreground">{user.email}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium text-foreground">{user.phone}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Account Type:</span>
                        <Badge variant="secondary">{user.role}</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountDetails;