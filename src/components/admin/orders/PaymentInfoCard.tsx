
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { Address } from '@/types/user';

interface PaymentInfoCardProps {
  paymentMethod?: string;
  billingAddress?: Address;
}

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ paymentMethod, billingAddress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-1"><span className="text-sm text-gray-500">Payment Method</span></p>
        <p className="font-medium">{paymentMethod || "Credit Card"}</p>
        <p className="mt-2 mb-1"><span className="text-sm text-gray-500">Billing Address</span></p>
        {billingAddress && (
          <div>
            <p>
              {billingAddress.firstName} {billingAddress.lastName}
            </p>
            <p>{billingAddress.address1}</p>
            <p>
              {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoCard;
