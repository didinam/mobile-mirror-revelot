
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CustomerInfoCardProps {
  customer: {
    id: string;
    email: string;
    name: string;
  };
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ customer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2" />
          Customer
        </CardTitle>
      </CardHeader>
      <CardContent>
        {customer && (
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-gray-500">{customer.email}</p>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/admin/customers/${customer.id}`}>
                  View Customer
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                Email
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerInfoCard;
