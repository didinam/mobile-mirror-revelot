
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/user';
import { Calendar, CheckCircle, Clock, Package, AlertTriangle, ExternalLink } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const UserOrders = () => {
  // Mock orders - in a real app these would come from an API
  const orders: Order[] = [
    {
      id: "ORD12345",
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
      trackingNumber: "TRK928172637"
    },
    {
      id: "ORD12346",
      date: "2023-11-20",
      status: "processing",
      total: 249.00,
      items: [
        {
          id: "ITEM2",
          productId: "prod2",
          title: "Gentus 38mm Gold",
          price: 249.00,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ]
    }
  ];
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Orders</h2>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">No orders yet</h3>
          <p className="text-gray-500 mt-2">Start shopping and your orders will appear here</p>
          <Button asChild className="mt-6">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{getStatusText(order.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/account/orders/${order.id}`}>View Details</Link>
                      </Button>
                      {order.trackingNumber && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/track-order/${order.id}`}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Track
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Order Details</h3>
            {orders.map((order) => (
              <div key={order.id} className="mb-8 border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <span>Order:</span>
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/track-order/${order.id}`}>Track Order</Link>
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 py-3">
                      <div className="w-16 h-16 rounded-md border overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="mt-1 font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total:</p>
                      <p className="text-lg font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <Button variant="outline" asChild>
                      <Link to={`/products/${order.items[0].productId}`}>
                        Buy Again
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
