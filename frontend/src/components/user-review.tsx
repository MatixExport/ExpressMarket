import React from 'react';
import { OrderReview } from '@/types/order-type';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronRight, ChevronRightSquare } from 'lucide-react';


interface UserReviewProps{
    review:OrderReview
}

const UserReview: React.FC<UserReviewProps> = ({review}
    ) => {
    return (
    <Collapsible className="group/collapsible">
         <CollapsibleTrigger className='flex'>
            <ChevronRightSquare className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            <span>Review</span>
         </CollapsibleTrigger>
         <CollapsibleContent>
     <div className="flex justify-center">
             <div className="w-10/12 max-h-40 overflow-y-auto">
                            <ul className="space-y-2 mt-2 flex flex-col justify-center bg-secondary rounded-lg justify-between p-3 border w-full">
                                <li
                                  className="flex justify-between items-center text-primary"
                                >
                                 <p>
                                    {review.review}
                                 </p>
                                </li>
                        
                              <p>
                                <div className="flex justify-end">
                                    <p className="font-medium font-extrabold mr-2">Rating:</p>
                                    <p className="font-medium font-semibold">{review.rating}</p>
                                </div>
                              </p>
                            </ul>
                          </div>
        </div>
        </CollapsibleContent>
        </Collapsible>
    );
};

export default UserReview;