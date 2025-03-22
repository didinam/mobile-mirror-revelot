
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/user';
import { ArrowLeft, Package, Truck, User, CreditCard, FileText, Send, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
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
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between py-1 font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.customer && (
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-gray-500">{order.customer.email}</p>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/customers/${order.customer.id}`}>
                        View Customer
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Email
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.shippingAddress && (
                <div>
                  <p className="font-medium">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-1"><span className="text-sm text-gray-500">Payment Method</span></p>
              <p className="font-medium">{order.paymentMethod || "Credit Card"}</p>
              <p className="mt-2 mb-1"><span className="text-sm text-gray-500">Billing Address</span></p>
              {order.billingAddress && (
                <div>
                  <p>
                    {order.billingAddress.firstName} {order.billingAddress.lastName}
                  </p>
                  <p>{order.billingAddress.address1}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderAdminDetail;
