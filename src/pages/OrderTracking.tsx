
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, CheckCircle, Truck, MapPin } from 'lucide-react';

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would be fetched from an API in a real app
  const trackingInfo = {
    orderId: id,
    trackingNumber: "TRK928172637",
    carrier: "FedEx",
    estimatedDelivery: "October 18, 2023",
    status: "In Transit",
    events: [
      {
        date: "October 17, 2023",
        time: "14:30",
        location: "Distribution Center, New York",
        description: "Package is out for delivery"
      },
      {
        date: "October 16, 2023",
        time: "18:45",
        location: "Sorting Facility, Chicago",
        description: "Package arrived at carrier facility"
      },
      {
        date: "October 15, 2023",
        time: "09:12",
        location: "Shipping Center",
        description: "Package has been picked up by carrier"
      },
      {
        date: "October 14, 2023",
        time: "16:05",
        location: "Fulfillment Center",
        description: "Order processed and ready for shipment"
      }
    ]
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-6">
        <Link to="/account/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order #{trackingInfo.orderId}
            </div>
            <Badge variant="outline" className="ml-2">
              {trackingInfo.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Tracking Number</p>
              <p className="font-medium">{trackingInfo.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carrier</p>
              <p className="font-medium">{trackingInfo.carrier}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">{trackingInfo.estimatedDelivery}</p>
            </div>
          </div>
          
          <div className="relative mt-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            <div className="space-y-8 relative z-10">
              {trackingInfo.events.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index === 0 ? <Truck className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium">{event.description}</div>
                    <div className="text-sm text-gray-500">
                      {event.date} at {event.time}
                    </div>
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/account/orders">View All Orders</Link>
        </Button>
        <Button variant="default" asChild>
          <a href={`https://www.fedex.com/track?tracknumbers=${trackingInfo.trackingNumber}`} target="_blank" rel="noopener noreferrer">
            Track on Carrier Website
          </a>
        </Button>
      </div>
    </div>
  );
};

export default OrderTracking;
