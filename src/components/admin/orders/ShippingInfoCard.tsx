
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { Address } from '@/types/user';

interface ShippingInfoCardProps {
  shippingAddress?: Address;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({ shippingAddress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Shipping
        </CardTitle>
      </CardHeader>
      <CardContent>
        {shippingAddress && (
          <div>
            <p className="font-medium">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p>{shippingAddress.address1}</p>
            {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
            {shippingAddress.phone && <p>{shippingAddress.phone}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingInfoCard;
