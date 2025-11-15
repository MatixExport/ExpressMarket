import { Separator } from "./ui/separator";
import { Order, OrderReview, OrderStatus } from "@/types/order-type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button";
import UserReview from "./user-review";
import UserOrderProducts from "./user-order-products";
import AddReviewDialog from "./add-review-dialog";
import ConfirmDialog from "./confirm-dialog";
import { cva } from "class-variance-authority";

type UserOrderProps = {
    onCancel: () => void;
    onAddReview: (review: OrderReview) => void;
    onConfirm: () => void;
    order: Order;
};

const badgeVariants = cva(
    "capitalize",
    {
        variants: {
            status: {
                [OrderStatus.UNAPPROVED]: "bg-yellow-500 hover:bg-yellow-600",
                [OrderStatus.APPROVED]: "bg-blue-500 hover:bg-blue-600",
                [OrderStatus.CANCELED]: "bg-red-500 hover:bg-red-600",
                [OrderStatus.COMPLETED]: "bg-green-500 hover:bg-green-600",
            },
        },
    }
);

const UserOrder: React.FC<UserOrderProps> = ({
    onCancel,
    onAddReview,
    onConfirm,
    order,
}) => {

    const isActionable = ![OrderStatus.COMPLETED, OrderStatus.CANCELED].includes(order.OrderStatusId);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>
                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                        </CardDescription>
                    </div>
                    <Badge className={badgeVariants({ status: order.OrderStatusId })}>
                        {OrderStatus[order.OrderStatusId].toLowerCase()}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
                {order.OrderStatusId === OrderStatus.COMPLETED && order.confirmDate && (
                    <div className="text-sm text-muted-foreground">
                        Confirmed on: {new Date(order.confirmDate).toLocaleString()}
                    </div>
                )}
                <UserOrderProducts products={order.Products} />
                {order.OrderReview && <UserReview review={order.OrderReview} />}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                {isActionable && (
                    <ConfirmDialog
                        title="Cancel Order"
                        text="Are you sure you want to cancel this order? This action cannot be undone."
                        onConfirm={onCancel}
                    >
                        <Button variant="destructive">Cancel</Button>
                    </ConfirmDialog>
                )}
                {order.OrderStatusId === OrderStatus.APPROVED && (
                     <ConfirmDialog
                        title="Confirm Receipt"
                        text="Please confirm that you have received your order."
                        onConfirm={onConfirm}
                    >
                        <Button>Confirm Receipt</Button>
                    </ConfirmDialog>
                )}
                {([OrderStatus.COMPLETED, OrderStatus.CANCELED].includes(order.OrderStatusId)) && order.OrderReview == null && (
                    <AddReviewDialog
                        orderId={order.id}
                        onComplete={onAddReview}
                    />
                )}
            </CardFooter>
        </Card>
    );
};

export default UserOrder;