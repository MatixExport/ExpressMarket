import useAuth from "@/hooks/use-auth"
import { Separator } from "@/components/ui/separator"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const AccountDetails = ()=>{

    const {user} = useAuth()
    if(!user){
        return "Unauthenticated"
    }
 
  return (
    <div className="container mx-auto max-w-md py-10">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Details</CardTitle>
        <Separator/>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white-600">Login:</span>
          <span className="font-medium text-white-900">{user.login}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white-600">Email:</span>
          <span className="font-medium text-white-900">{user.email}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white-600">Phone:</span>
          <span className="font-medium text-white-900">{user.phone}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white-600">Account Type:</span>
          <Badge variant="outline">{user.role}</Badge>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default AccountDetails;