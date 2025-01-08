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

import React, { useState } from "react"

import { PenBox } from "lucide-react"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { OrderStatus } from "@/types/order-type"
  

interface SetOrderStatusDialogProps{
    onDialogSubmit:(statusId:number)=>void,
    defaultValue:number
}

const SetOrderStatusDialog:React.FC<SetOrderStatusDialogProps> = ({
    onDialogSubmit,
    defaultValue
})=> {

    const [open, setOpen] = React.useState<boolean>(false)
    const [value,setValue] = React.useState<number | null>()

    const handleSumbit = (e)=>{
        setOpen(false)
        if(value){
            onDialogSubmit(value)
        }
       
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 w-4" variant="outline">
            <PenBox/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change order status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Select defaultValue={defaultValue.toString()} onValueChange={(newValue)=>{setValue(Number(newValue))}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="status" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(OrderStatus).filter((value)=>isNaN(Number(value))).map((key)=>(
                            <SelectItem value={OrderStatus[key as keyof typeof OrderStatus].toString()}>{key.toLowerCase()}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSumbit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetOrderStatusDialog