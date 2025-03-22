
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/user';
import { ArrowLeft, Package, Truck, Calendar, CreditCard } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would be fetched from an API
  const order: Order = {
    id: id || "ORD12345",
    date: "2023-10-15",
    status: "delivered",
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
    paymentMethod: "Credit Card (**** 4321)"
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
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
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/account/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <p className="text-gray-500">{formatDate(order.date)}</p>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="h-5 w-5 mr-2" />
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
                    {item.variantInfo && (
                      <p className="text-sm text-gray-500">{item.variantInfo}</p>
                    )}
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
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping Information
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
                  
                  {order.trackingNumber && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-medium">{order.trackingNumber}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Track Package
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><span className="text-sm text-gray-500">Payment Method</span></p>
              <p className="font-medium">{order.paymentMethod || "Credit Card"}</p>
              <p><span className="text-sm text-gray-500">Order Date</span></p>
              <p className="font-medium">{formatDate(order.date)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/account/orders/${order.id}/return`}>Request Return</Link>
        </Button>
        <Button asChild>
          <a href="#" download>Download Invoice</a>
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
