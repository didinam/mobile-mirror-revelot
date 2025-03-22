
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Store } from 'lucide-react';

interface StoreSettingsProps {
  storeSettings: {
    storeName: string;
    storeEmail: string;
    supportEmail: string;
    phoneNumber: string;
    address: string;
    currency: string;
    weightUnit: string;
  };
  setStoreSettings: React.Dispatch<React.SetStateAction<{
    storeName: string;
    storeEmail: string;
    supportEmail: string;
    phoneNumber: string;
    address: string;
    currency: string;
    weightUnit: string;
  }>>;
  handleStoreSubmit: (e: React.FormEvent) => void;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ 
  storeSettings, 
  setStoreSettings,
  handleStoreSubmit 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>
          Basic information about your store that will appear on receipts and communications.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleStoreSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel htmlFor="storeName">Store Name</FormLabel>
              <Input 
                id="storeName" 
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="storeEmail">Store Email</FormLabel>
              <Input 
                id="storeEmail" 
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="supportEmail">Support Email</FormLabel>
              <Input 
                id="supportEmail" 
                type="email"
                value={storeSettings.supportEmail}
                onChange={(e) => setStoreSettings({...storeSettings, supportEmail: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input 
                id="phoneNumber" 
                value={storeSettings.phoneNumber}
                onChange={(e) => setStoreSettings({...storeSettings, phoneNumber: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input 
              id="address" 
              value={storeSettings.address}
              onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel htmlFor="currency">Currency</FormLabel>
              <Input 
                id="currency" 
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="weightUnit">Weight Unit</FormLabel>
              <Input 
                id="weightUnit" 
                value={storeSettings.weightUnit}
                onChange={(e) => setStoreSettings({...storeSettings, weightUnit: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StoreSettings;
