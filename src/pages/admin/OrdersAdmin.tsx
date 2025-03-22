
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/user';
import { Search, Filter, FileDown, Package, Eye } from 'lucide-react';

const OrdersAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
      customer: {
        id: "cust1",
        email: "john.doe@example.com",
        name: "John Doe"
      }
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
      ],
      customer: {
        id: "cust2",
        email: "jane.smith@example.com",
        name: "Jane Smith"
      }
    },
    {
      id: "ORD12347",
      date: "2023-11-22",
      status: "shipped",
      total: 549.00,
      items: [
        {
          id: "ITEM3",
          productId: "prod3",
          title: "Altera 42mm Silver",
          price: 549.00,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      customer: {
        id: "cust3",
        email: "robert.johnson@example.com",
        name: "Robert Johnson"
      }
    },
    {
      id: "ORD12348",
      date: "2023-11-23",
      status: "pending",
      total: 199.00,
      items: [
        {
          id: "ITEM4",
          productId: "prod4",
          title: "Chronos 36mm Black",
          price: 199.00,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      customer: {
        id: "cust4",
        email: "sarah.williams@example.com",
        name: "Sarah Williams"
      }
    }
  ];
  
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
  
  const filteredOrders = orders
    .filter(order => statusFilter === 'all' || order.status === statusFilter)
    .filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customer?.name && order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.customer?.email && order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm mb-8">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="flex gap-2 items-center">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.customer ? (
                        <div>
                          <div>{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </div>
                      ) : (
                        "Anonymous"
                      )}
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin;
