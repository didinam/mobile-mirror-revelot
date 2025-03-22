
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types/user';
import { getStatusColor, formatDate } from '@/utils/orderUtils';

// Import our new components
import OrderStatusCard from '@/components/admin/orders/OrderStatusCard';
import OrderItemsCard from '@/components/admin/orders/OrderItemsCard';
import CustomerInfoCard from '@/components/admin/orders/CustomerInfoCard';
import ShippingInfoCard from '@/components/admin/orders/ShippingInfoCard';
import PaymentInfoCard from '@/components/admin/orders/PaymentInfoCard';

const OrderAdminDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [status, setStatus] = useState<Order['status']>('processing');
  const [trackingNumber, setTrackingNumber] = useState("TRK928172637");
  const [notes, setNotes] = useState("");
  
  // In a real app, this would be fetched from an API
  const order: Order = {
    id: id || "ORD12345",
    date: "2023-10-15",
    status: "processing",
    total: 299.00,
    items: [
      {
        id: "ITEM1",
        productId: "prod1",
        title: "Terra 40mm Black",
        price: 299.00,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ],
    trackingNumber: "TRK928172637",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "+1 234 567 8900"
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "+1 234 567 8900"
    },
    paymentMethod: "Credit Card (**** 4321)",
    customer: {
      id: "cust1",
      email: "john.doe@example.com",
      name: "John Doe"
    }
  };
  
  const handleUpdateOrder = () => {
    // In a real app, this would send an API request
    toast({
      title: "Order Updated",
      description: `Order ${id} has been successfully updated`,
    });
  };
  
  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Order update email has been sent to ${order.customer?.email}`,
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/admin/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <p className="text-gray-500">{formatDate(order.date)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleSendEmail}>
            <Send className="h-4 w-4" />
            Email Customer
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderStatusCard 
            status={status}
            setStatus={setStatus}
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            notes={notes}
            setNotes={setNotes}
            handleUpdateOrder={handleUpdateOrder}
            getStatusColor={getStatusColor}
          />
          
          <OrderItemsCard 
            items={order.items}
            total={order.total}
          />
        </div>
        
        <div className="space-y-6">
          {order.customer && (
            <CustomerInfoCard customer={order.customer} />
          )}
          
          {order.shippingAddress && (
            <ShippingInfoCard shippingAddress={order.shippingAddress} />
          )}
          
          <PaymentInfoCard 
            paymentMethod={order.paymentMethod}
            billingAddress={order.billingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderAdminDetail;
