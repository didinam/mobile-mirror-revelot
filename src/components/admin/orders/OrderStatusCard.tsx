
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/user';

interface OrderStatusCardProps {
  status: Order['status'];
  setStatus: (status: Order['status']) => void;
  trackingNumber: string;
  setTrackingNumber: (trackingNumber: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleUpdateOrder: () => void;
  getStatusColor: (status: Order['status']) => string;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  status,
  setStatus,
  trackingNumber,
  setTrackingNumber,
  notes,
  setNotes,
  handleUpdateOrder,
  getStatusColor
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Order Details
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Order Status</label>
            <Select value={status} onValueChange={(value: Order['status']) => setStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Tracking Number</label>
            <Input 
              value={trackingNumber} 
              onChange={(e) => setTrackingNumber(e.target.value)} 
              placeholder="Enter tracking number"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Admin Notes</label>
            <Textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Add private notes about this order"
              rows={3}
            />
          </div>
          
          <div className="pt-4">
            <Button onClick={handleUpdateOrder}>Update Order</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
