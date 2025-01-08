import * as React from "react"
import {
  ShoppingBasket,
  GalleryVerticalEnd,
  SquareTerminal,
  FileInputIcon,
  C

} from "lucide-react"


import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import SignInButton from "./sign-in-button"
import useAuth from "@/hooks/use-auth"
import { Link } from "react-router-dom"
import { NavProjects } from "./nav-projects"
import { UserRole } from "@/types/user-type"

const data = {
  navMain: [
    {
      title: "Products",
      url: "/",
      icon: ShoppingBasket,
      isActive: true,
      items: [
      
      ],
    },
  ],
  navAdmin : [
    {
      title: "Init products",
      url: "/products/init",
      icon: FileInputIcon,
      isActive: true,
      items: [
      
      ],
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user,login,logout} = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex space-x-2 mt-2 ">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  ExpressMarket
                </span>
                <span className="truncate text-xs">v.0.0.1</span>
              </div>
            </div>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Pages" items={data.navMain} />
        {(user && user.role == UserRole.EMPLOYEE) && (
           <NavMain title="Admin Pages" items={data.navAdmin} />
        ) }
      </SidebarContent>
      <SidebarFooter>
        {user ? (
            <NavUser 
            onLogout={logout}
            user={{
              name:user.login,
              email:user.email,
              avatar:user.login.substring(0,2).toUpperCase()
            }} />
        ): (
          <SidebarMenu>
            <SidebarMenuItem>
            <div className="flex mb-2 content-center w-full">
                <SignInButton/>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        )}
      
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
