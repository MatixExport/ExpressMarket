
import { Separator } from "./ui/separator";
import { Order, OrderProduct, OrderReview, OrderStatus } from "@/types/order-type";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button";
import UserReview from "./user-review";
import UserOrderProducts from "./user-order-products";
import AddReviewDialog from "./add-review-dialog";


type UserOrderProps = {
    onCancel: ()=>void;
    onAddReview:(review: OrderReview)=>void;
    onConfirm:()=>void;
    order:Order;
};

const UserOrder: React.FC<UserOrderProps> = ({
    onCancel,
    onAddReview,
    onConfirm,
    order,
    }) => {


    return (
    <div className="container mx-auto max-w-md py-10">
    <Card>
      <CardHeader>
       
        <div className="flex justify-between">
            <CardTitle className="text-l font-semibold h-8 align-bottom">Order #{order.id}</CardTitle>
            {(([OrderStatus.COMPLETED,OrderStatus.CANCELED].includes(order.OrderStatusId))&&(order.OrderReview == null)) && (
                <AddReviewDialog
                    orderId={order.id}
                    onComplete={onAddReview}
                />
            ) }
             {![OrderStatus.COMPLETED,OrderStatus.CANCELED].includes(order.OrderStatusId) && (
                <Button className="bg-destructive text-destructive-foreground h-8 px-4 m-2" onClick={(_)=>onCancel()}>
                Cancel
            </Button>
            ) }
            {order.OrderStatusId == OrderStatus.APPROVED && (
                <Button className="h-8 px-4 m-2" onClick={(_)=>onConfirm()}>
                Confirm
            </Button>
            ) }
          
        </div>
        <Separator/>
      </CardHeader>
      <CardContent className="space-y-4">
       
    
        <div className="flex">
            <Badge>
                {OrderStatus[order.OrderStatusId].toLowerCase()}
            </Badge>
        </div>

        {(order.OrderStatusId == OrderStatus.COMPLETED) && (<div className="flex">
          <span className="text-white-600 mr-2">Confirm date:</span>
          <span className="font-medium text-white-900">{order.confirmDate ? new Date(order.confirmDate).toLocaleString(): "Not confirmed"}</span>
        </div>)}

        {<UserOrderProducts
            products={order.Products}
        />}
        {order.OrderReview && <UserReview review={order.OrderReview}/>}
      </CardContent>
    </Card>
  </div>
    );
};

export default UserOrder;