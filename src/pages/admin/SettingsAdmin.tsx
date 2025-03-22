
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Save, Store, Globe, ShieldCheck, Bell, Mail } from 'lucide-react';

const SettingsAdmin = () => {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Chronos Watches",
    storeEmail: "contact@chronos-watches.com",
    supportEmail: "support@chronos-watches.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    currency: "USD",
    weightUnit: "kg"
  });
  
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Chronos Watches | Luxury Timepieces",
    metaDescription: "Discover premium watches at Chronos. Luxury timepieces for every occasion.",
    socialLinks: {
      facebook: "https://facebook.com/chronos",
      instagram: "https://instagram.com/chronos_watches",
      twitter: "https://twitter.com/chronos"
    },
    googleAnalyticsId: "UA-XXXXXXXXX-X"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiration: 90,
    ipRestriction: false,
    automaticLogout: 30
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockNotifications: true,
    customerSignups: true,
    newsletterSignups: false
  });
  
  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Store settings have been updated successfully.",
    });
  };
  
  const handleSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Site settings have been updated successfully.",
    });
  };
  
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Security settings have been updated successfully.",
    });
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
      
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Site
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="store">
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
        </TabsContent>
        
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                SEO and social media settings to improve your online presence.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSiteSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="siteTitle">Site Title</FormLabel>
                  <Input 
                    id="siteTitle" 
                    value={siteSettings.siteTitle}
                    onChange={(e) => setSiteSettings({...siteSettings, siteTitle: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="metaDescription">Meta Description</FormLabel>
                  <Input 
                    id="metaDescription" 
                    value={siteSettings.metaDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, metaDescription: e.target.value})}
                  />
                  <FormDescription>
                    Recommended to keep under 160 characters for optimal SEO.
                  </FormDescription>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="facebook">Facebook</FormLabel>
                    <Input 
                      id="facebook" 
                      value={siteSettings.socialLinks.facebook}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: {...siteSettings.socialLinks, facebook: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="instagram">Instagram</FormLabel>
                    <Input 
                      id="instagram" 
                      value={siteSettings.socialLinks.instagram}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: {...siteSettings.socialLinks, instagram: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="twitter">Twitter</FormLabel>
                    <Input 
                      id="twitter" 
                      value={siteSettings.socialLinks.twitter}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: {...siteSettings.socialLinks, twitter: e.target.value}
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="googleAnalyticsId">Google Analytics ID</FormLabel>
                  <Input 
                    id="googleAnalyticsId" 
                    value={siteSettings.googleAnalyticsId}
                    onChange={(e) => setSiteSettings({...siteSettings, googleAnalyticsId: e.target.value})}
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
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Protect your store and customer data with these security settings.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSecuritySubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                    <FormDescription>
                      Require staff to verify their identity with a second device
                    </FormDescription>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="passwordExpiration">Password Expiration (days)</FormLabel>
                  <Input 
                    id="passwordExpiration" 
                    type="number"
                    value={securitySettings.passwordExpiration}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiration: parseInt(e.target.value)})}
                  />
                  <FormDescription>
                    Set to 0 to disable password expiration.
                  </FormDescription>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">IP Restriction</FormLabel>
                    <FormDescription>
                      Limit login attempts from unfamiliar IP addresses
                    </FormDescription>
                  </div>
                  <Switch
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="automaticLogout">Automatic Logout (minutes)</FormLabel>
                  <Input 
                    id="automaticLogout" 
                    type="number"
                    value={securitySettings.automaticLogout}
                    onChange={(e) => setSecuritySettings({...securitySettings, automaticLogout: parseInt(e.target.value)})}
                  />
                  <FormDescription>
                    Time of inactivity before automatically logging out users.
                  </FormDescription>
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
        </TabsContent>
        
        <TabsContent value="notifications">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
