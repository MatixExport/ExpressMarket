import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import useAuth from "@/hooks/use-auth"
import { Link } from "react-router-dom"
import ShoppingCart from "./shop-cart"
import { ReactNode } from "react"


interface NavbarOverlayProps{
  children:ReactNode,
}


const NavbarOverlay : React.FC<NavbarOverlayProps> =  ({children})=> {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="mr-5">
            <div className="flex">
              <Link key={450} to="/checkout">
                         <SidebarMenuItem className="flex justify-center mr-2">
                           <ShoppingCart/>
                         </SidebarMenuItem>
              </Link>
              <ModeToggle/>
            </div>
           
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default NavbarOverlay
