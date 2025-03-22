
import React from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const CheckoutConfirmation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Generate a fake order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/account/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been received and is now being processed. 
          We've sent a confirmation email to {user.email}.
        </p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Order Number</div>
                  <div>{orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Date</div>
                  <div>{new Date().toLocaleDateString()}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Shipping Address</div>
                <div>
                  {user.firstName} {user.lastName}<br />
                  123 Example St<br />
                  City, State 12345
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/account/orders">View My Orders</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
