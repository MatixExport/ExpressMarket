import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { ReactNode, useState } from "react"



interface ConfirmDialogProps{
    children:ReactNode,
    onConfirm:()=>void,
    title:string,
    text:string

}

const ConfirmDialog:React.FC<ConfirmDialogProps> = ({
    children,
    onConfirm,
    title,
    text
})=> {

    const [open, setOpen] = React.useState<boolean>(false)

    const handleSumbit = (e)=>{
        setOpen(false)
        onConfirm()
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            {text}
        </DialogDescription>
        {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
               
            </div>
        </div> */}
        <DialogFooter className="flex">
            <Button className="mr-2 bg-destructive text-destructive-foreground" onClick={(e)=>{setOpen(false)}}>Cancel</Button>
            <Button onClick={handleSumbit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog