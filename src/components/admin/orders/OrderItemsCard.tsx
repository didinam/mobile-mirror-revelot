
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { OrderItem } from '@/types/user';

interface OrderItemsCardProps {
  items: OrderItem[];
  total: number;
}

const OrderItemsCard: React.FC<OrderItemsCardProps> = ({ items, total }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-md border overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">Product ID: {item.productId}</p>
                  <p className="text-sm font-medium">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-1 font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemsCard;
