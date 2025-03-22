
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const SettingsAdmin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // General settings
  const [storeName, setStoreName] = useState('Chrono Store');
  const [storeEmail, setStoreEmail] = useState('info@chronostore.com');
  const [storePhone, setStorePhone] = useState('+1 (555) 123-4567');
  const [storeAddress, setStoreAddress] = useState('123 Main St, New York, NY 10001');
  const [currency, setCurrency] = useState('USD');
  
  // Email settings
  const [emailFromName, setEmailFromName] = useState('Chrono Store');
  const [emailFromAddress, setEmailFromAddress] = useState('notifications@chronostore.com');
  const [emailFooter, setEmailFooter] = useState('© 2023 Chrono Store. All rights reserved.');
  
  // Shipping settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('100');
  const [shippingOptions, setShippingOptions] = useState([
    { name: 'Standard Shipping', price: '5.00', days: '3-5' },
    { name: 'Express Shipping', price: '15.00', days: '1-2' }
  ]);
  
  // Payment settings
  const [acceptPaypal, setAcceptPaypal] = useState(true);
  const [acceptCreditCards, setAcceptCreditCards] = useState(true);
  const [testMode, setTestMode] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your store settings have been updated successfully",
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Settings</h1>
      </div>
      
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full flex justify-start overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
          <TabsTrigger value="checkout">Checkout</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information for your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-email">Store Email</Label>
                <Input
                  id="store-email"
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-phone">Store Phone</Label>
                <Input
                  id="store-phone"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Textarea
                  id="store-address"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure how emails are sent from your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-from-name">From Name</Label>
                <Input
                  id="email-from-name"
                  value={emailFromName}
                  onChange={(e) => setEmailFromName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-from-address">From Email Address</Label>
                <Input
                  id="email-from-address"
                  type="email"
                  value={emailFromAddress}
                  onChange={(e) => setEmailFromAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-footer">Email Footer Text</Label>
                <Textarea
                  id="email-footer"
                  value={emailFooter}
                  onChange={(e) => setEmailFooter(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure shipping methods and costs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="free-shipping-threshold"
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Orders above this amount qualify for free shipping. Set to 0 to disable.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Shipping Options</Label>
                {shippingOptions.map((option, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`shipping-name-${index}`}>Method Name</Label>
                        <Input
                          id={`shipping-name-${index}`}
                          value={option.name}
                          onChange={(e) => {
                            const newOptions = [...shippingOptions];
                            newOptions[index].name = e.target.value;
                            setShippingOptions(newOptions);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`shipping-price-${index}`}>Price ($)</Label>
                        <Input
                          id={`shipping-price-${index}`}
                          value={option.price}
                          onChange={(e) => {
                            const newOptions = [...shippingOptions];
                            newOptions[index].price = e.target.value;
                            setShippingOptions(newOptions);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`shipping-days-${index}`}>Delivery Time (days)</Label>
                        <Input
                          id={`shipping-days-${index}`}
                          value={option.days}
                          onChange={(e) => {
                            const newOptions = [...shippingOptions];
                            newOptions[index].days = e.target.value;
                            setShippingOptions(newOptions);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="accept-credit-cards">Credit Cards</Label>
                  <p className="text-sm text-gray-500">
                    Accept payments via Visa, Mastercard, Amex
                  </p>
                </div>
                <Switch
                  id="accept-credit-cards"
                  checked={acceptCreditCards}
                  onCheckedChange={setAcceptCreditCards}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="accept-paypal">PayPal</Label>
                  <p className="text-sm text-gray-500">
                    Accept payments via PayPal
                  </p>
                </div>
                <Switch
                  id="accept-paypal"
                  checked={acceptPaypal}
                  onCheckedChange={setAcceptPaypal}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="test-mode">Test Mode</Label>
                  <p className="text-sm text-gray-500">
                    Process payments in test mode (no actual charges)
                  </p>
                </div>
                <Switch
                  id="test-mode"
                  checked={testMode}
                  onCheckedChange={setTestMode}
                />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>
                Configure how taxes are calculated and applied
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                Tax settings configuration will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkout">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Settings</CardTitle>
              <CardDescription>
                Configure the checkout experience for your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                Checkout settings configuration will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
