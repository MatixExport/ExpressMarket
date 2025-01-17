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
import CreateReviewSchema from "@/types/order-review-schema"
import { OrderReview } from "@/types/order-type"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { addOrderReview } from "@/lookup"
import { Response } from "@/types/response-type"
import ErrorMessage from "@/types/error-message"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import FormFieldRender from "./form-field-render"
import { Textarea } from "./ui/textarea"
import { z } from "zod"


interface AddReviewDialogProps{
    onComplete:(review:OrderReview)=>void,
    orderId:number
}

const AddReviewDialog:React.FC<AddReviewDialogProps> = ({
    onComplete,
    orderId
})=> {

    const [globalError,setGlobalError] = useState<string|null>(null)
    const [open, setOpen] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof CreateReviewSchema>>({
        resolver: zodResolver(CreateReviewSchema),
        reValidateMode:"onChange",
        defaultValues: {
            review:""
        },
    })


 
  function onSubmit(values: z.infer<typeof CreateReviewSchema>) {
    console.log("submit")
    setGlobalError(null)
    addOrderReview(orderId,values).then((response:Response)=>{
        if(response.status >= 400){
            response.body.error.message.forEach((msg:ErrorMessage)=>{
                if(msg.field == "global"){
                    setGlobalError(msg.message)
                }else{
                    form.setError(msg.field, {type:"server",message: msg.message})
                }
            })
        }else{
            onComplete(response.body.data)
            setOpen(false)
            //close dialog
        }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground h-8 px-4 m-2">Add review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add review</DialogTitle>
          <DialogDescription>
            Write your review and add rating. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
          <FormField
                    name="review"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                        <div className="flex gap-6">
                            <FormLabel>Review</FormLabel>
                        </div>
                        <FormControl>
                            <Textarea placeholder="review" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                />
          </div>
          <div className="grid gap-2">
          <FormField
                    name="rating"
                    control={form.control}
                    render={({field})=>(
                        <FormFieldRender
                        label="Rating"
                        type="number"
                        placeholder=""
                        field={field}
                        />
                    )}
                />
          </div>
        </div>
        <DialogFooter>
            {globalError && globalError}
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewDialog