
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Promotion } from '@/types';
import { format } from 'date-fns';
import { Trash2, PlusCircle, Edit, AlertCircle } from 'lucide-react';

const PromotionsAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Sample initial promotions data
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      code: 'SUMMER2023',
      type: 'percentage',
      value: 15,
      minPurchase: 50,
      startDate: '2023-06-01T00:00:00Z',
      endDate: '2023-08-31T23:59:59Z',
      usageLimit: 1000,
      usageCount: 450,
      status: 'active',
      description: 'Summer discount for all products'
    },
    {
      id: '2',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2023-12-31T23:59:59Z',
      usageCount: 872,
      status: 'active',
      description: 'Welcome discount for new customers'
    },
    {
      id: '3',
      code: 'FREESHIP',
      type: 'free_shipping',
      value: 0,
      minPurchase: 100,
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2023-12-31T23:59:59Z',
      usageCount: 523,
      status: 'active',
      description: 'Free shipping on orders over $100'
    }
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Partial<Promotion>>({
    code: '',
    type: 'percentage',
    value: 0,
    minPurchase: 0,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usageLimit: undefined,
    status: 'active',
    description: ''
  });

  const handleEditPromotion = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setIsEditing(true);
  };

  const handleCreatePromotion = () => {
    setCurrentPromotion({
      code: '',
      type: 'percentage',
      value: 0,
      minPurchase: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: undefined,
      status: 'active',
      description: ''
    });
    setIsEditing(true);
  };

  const handleSavePromotion = () => {
    if (!currentPromotion.code) {
      toast({
        title: "Error",
        description: "Promotion code is required",
        variant: "destructive",
      });
      return;
    }

    if (currentPromotion.id) {
      // Update existing promotion
      setPromotions(promotions.map(promo => 
        promo.id === currentPromotion.id ? { ...promo, ...currentPromotion } as Promotion : promo
      ));
      toast({
        title: "Promotion updated",
        description: `Promotion code "${currentPromotion.code}" has been updated.`,
      });
    } else {
      // Create new promotion
      const newPromotion: Promotion = {
        ...currentPromotion as Omit<Promotion, 'id' | 'usageCount'>,
        id: `promo_${Date.now()}`,
        usageCount: 0
      } as Promotion;
      
      setPromotions([...promotions, newPromotion]);
      toast({
        title: "Promotion created",
        description: `Promotion code "${newPromotion.code}" has been created.`,
      });
    }
    
    setIsEditing(false);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
    toast({
      title: "Promotion deleted",
      description: "The promotion has been deleted.",
    });
  };

  const handleToggleStatus = (id: string, currentStatus: 'active' | 'expired' | 'scheduled' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setPromotions(promotions.map(promo => 
      promo.id === id ? { ...promo, status: newStatus } : promo
    ));
    
    toast({
      title: `Promotion ${newStatus}`,
      description: `The promotion has been ${newStatus}.`,
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getPromotionValue = (promotion: Promotion) => {
    switch (promotion.type) {
      case 'percentage':
        return `${promotion.value}%`;
      case 'fixed':
        return `$${promotion.value}`;
      case 'free_shipping':
        return 'Free Shipping';
      default:
        return promotion.value.toString();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promotions</h1>
        <Button onClick={handleCreatePromotion}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentPromotion.id ? 'Edit Promotion' : 'Create Promotion'}</CardTitle>
            <CardDescription>
              {currentPromotion.id ? 'Update the promotion details' : 'Create a new promotion code'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Promotion Code</Label>
                <Input
                  id="code"
                  value={currentPromotion.code}
                  onChange={(e) => setCurrentPromotion({...currentPromotion, code: e.target.value.toUpperCase()})}
                  placeholder="e.g. SUMMER2023"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select
                  value={currentPromotion.type}
                  onValueChange={(value: 'percentage' | 'fixed' | 'free_shipping') => 
                    setCurrentPromotion({...currentPromotion, type: value})
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {currentPromotion.type !== 'free_shipping' && (
                <div className="space-y-2">
                  <Label htmlFor="value">
                    {currentPromotion.type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={currentPromotion.value}
                    onChange={(e) => setCurrentPromotion({
                      ...currentPromotion, 
                      value: parseFloat(e.target.value)
                    })}
                    placeholder={currentPromotion.type === 'percentage' ? 'e.g. 15' : 'e.g. 10'}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="minPurchase">Minimum Purchase</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  value={currentPromotion.minPurchase}
                  onChange={(e) => setCurrentPromotion({
                    ...currentPromotion, 
                    minPurchase: parseFloat(e.target.value)
                  })}
                  placeholder="e.g. 50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentPromotion.startDate ? 
                    new Date(currentPromotion.startDate).toISOString().split('T')[0] : 
                    new Date().toISOString().split('T')[0]
                  }
                  onChange={(e) => setCurrentPromotion({
                    ...currentPromotion, 
                    startDate: new Date(e.target.value).toISOString()
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentPromotion.endDate ? 
                    new Date(currentPromotion.endDate).toISOString().split('T')[0] : 
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                  }
                  onChange={(e) => setCurrentPromotion({
                    ...currentPromotion, 
                    endDate: new Date(e.target.value).toISOString()
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={currentPromotion.usageLimit || ''}
                  onChange={(e) => setCurrentPromotion({
                    ...currentPromotion, 
                    usageLimit: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                  placeholder="e.g. 1000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentPromotion.status}
                  onValueChange={(value: 'active' | 'expired' | 'scheduled' | 'inactive') => 
                    setCurrentPromotion({...currentPromotion, status: value})
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentPromotion.description}
                onChange={(e) => setCurrentPromotion({...currentPromotion, description: e.target.value})}
                placeholder="Internal description of this promotion"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromotion}>
              Save Promotion
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Promotions</CardTitle>
            <CardDescription>
              Manage your store's promotion codes and discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="font-medium">{promotion.code}</TableCell>
                    <TableCell>
                      {promotion.type === 'percentage' ? 'Percentage' : 
                       promotion.type === 'fixed' ? 'Fixed Amount' : 
                       'Free Shipping'}
                    </TableCell>
                    <TableCell>{getPromotionValue(promotion)}</TableCell>
                    <TableCell>
                      {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={promotion.status === 'active'}
                          onCheckedChange={() => handleToggleStatus(promotion.id, promotion.status)}
                        />
                        <span className={`text-xs px-2 py-1 rounded ${
                          promotion.status === 'active' ? 'bg-green-100 text-green-800' :
                          promotion.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          promotion.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {promotion.usageCount}
                      {promotion.usageLimit && ` / ${promotion.usageLimit}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeletePromotion(promotion.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromotionsAdmin;
