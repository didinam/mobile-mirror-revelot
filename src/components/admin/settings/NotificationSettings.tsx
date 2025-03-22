
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Mail } from 'lucide-react';

interface NotificationSettingsProps {
  notificationSettings: {
    orderNotifications: boolean;
    lowStockNotifications: boolean;
    customerSignups: boolean;
    newsletterSignups: boolean;
  };
  setNotificationSettings: React.Dispatch<React.SetStateAction<{
    orderNotifications: boolean;
    lowStockNotifications: boolean;
    customerSignups: boolean;
    newsletterSignups: boolean;
  }>>;
  handleNotificationSubmit: (e: React.FormEvent) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notificationSettings, 
  setNotificationSettings,
  handleNotificationSubmit 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure which events trigger email notifications to store admins.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleNotificationSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                <Mail className="h-4 w-4 inline mr-2" />
                Order Notifications
              </FormLabel>
              <FormDescription>
                Receive notifications for new orders and order status changes
              </FormDescription>
            </div>
            <Switch
              checked={notificationSettings.orderNotifications}
              onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderNotifications: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                <Mail className="h-4 w-4 inline mr-2" />
                Low Stock Notifications
              </FormLabel>
              <FormDescription>
                Get alerted when product inventory falls below threshold
              </FormDescription>
            </div>
            <Switch
              checked={notificationSettings.lowStockNotifications}
              onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockNotifications: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                <Mail className="h-4 w-4 inline mr-2" />
                Customer Signups
              </FormLabel>
              <FormDescription>
                Receive notifications when new customers register
              </FormDescription>
            </div>
            <Switch
              checked={notificationSettings.customerSignups}
              onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, customerSignups: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                <Mail className="h-4 w-4 inline mr-2" />
                Newsletter Signups
              </FormLabel>
              <FormDescription>
                Get notified when visitors subscribe to your newsletter
              </FormDescription>
            </div>
            <Switch
              checked={notificationSettings.newsletterSignups}
              onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newsletterSignups: checked})}
            />
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

export default NotificationSettings;
