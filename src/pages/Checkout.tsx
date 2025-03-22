
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { CheckCircle, CreditCard, Truck, User } from 'lucide-react';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: user?.email || '',
  });
  
  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/account/login?redirect=checkout" />;
  }
  
  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping info
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      toast.error('Please fill out all required fields');
      return;
    }
    setStep(2);
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate order processing delay
    setTimeout(() => {
      // Clear the cart after successful order
      clearCart();
      
      // Show confirmation
      toast.success('Order completed successfully!', {
        description: 'Your order has been received and is being processed.',
      });
      
      // Navigate to order confirmation page
      navigate('/checkout/confirmation');
      setIsLoading(false);
    }, 1500);
  };
  
  const shipping = 10.00;
  const taxes = subtotal * 0.07; // Example tax rate
  const totalAmount = subtotal + shipping + taxes;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between relative">
          <div className="w-full absolute top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          {[1, 2, 3].map((stepNumber) => (
            <div 
              key={stepNumber} 
              className={`flex flex-col items-center ${step >= stepNumber ? 'text-black' : 'text-gray-400'}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > stepNumber 
                    ? 'bg-green-500 text-white' 
                    : step === stepNumber 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircle className="w-6 h-6" />
                ) : stepNumber === 1 ? (
                  <User className="w-5 h-5" />
                ) : stepNumber === 2 ? (
                  <Truck className="w-5 h-5" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm">
                {stepNumber === 1 ? 'Information' : stepNumber === 2 ? 'Shipping' : 'Payment'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping address.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitShipping}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={shippingInfo.firstName} 
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={shippingInfo.lastName} 
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={shippingInfo.email} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="Street address" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state" 
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Postal Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Continue to Shipping</Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
                <CardDescription>Select your preferred shipping method.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitPayment}>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center border border-gray-200 rounded p-4">
                      <input 
                        type="radio" 
                        id="shipping-standard" 
                        name="shipping-method" 
                        className="h-4 w-4 mr-3" 
                        defaultChecked 
                      />
                      <Label htmlFor="shipping-standard" className="flex-1">Standard Shipping (3-5 business days)</Label>
                      <span className="font-medium">$10.00</span>
                    </div>
                    
                    <div className="flex items-center border border-gray-200 rounded p-4">
                      <input 
                        type="radio" 
                        id="shipping-express" 
                        name="shipping-method" 
                        className="h-4 w-4 mr-3" 
                      />
                      <Label htmlFor="shipping-express" className="flex-1">Express Shipping (1-2 business days)</Label>
                      <span className="font-medium">$25.00</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Continue to Payment</Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Enter your payment information.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitOrder}>
                <CardContent>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="applepay">Apple Pay</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" placeholder="John Doe" required />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">You'll be redirected to PayPal to complete your purchase.</p>
                        <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="PayPal Checkout" className="mx-auto" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="applepay" className="mt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">Complete your purchase with Apple Pay.</p>
                        <div className="bg-black text-white py-3 px-6 rounded-lg inline-block font-medium">
                          Pay with <span className="font-serif">Apple Pay</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Complete Order'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}
                        {item.attributes && item.attributes.length > 0 && (
                          <span> ({item.attributes.map(attr => attr.value).join(', ')})</span>
                        )}
                      </div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
