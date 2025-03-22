
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Store, Globe, ShieldCheck, Bell } from 'lucide-react';

// Import our new components
import StoreSettings from '@/components/admin/settings/StoreSettings';
import SiteSettings from '@/components/admin/settings/SiteSettings';
import SecuritySettings from '@/components/admin/settings/SecuritySettings';
import NotificationSettings from '@/components/admin/settings/NotificationSettings';

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
          <StoreSettings 
            storeSettings={storeSettings} 
            setStoreSettings={setStoreSettings} 
            handleStoreSubmit={handleStoreSubmit} 
          />
        </TabsContent>
        
        <TabsContent value="site">
          <SiteSettings 
            siteSettings={siteSettings} 
            setSiteSettings={setSiteSettings} 
            handleSiteSubmit={handleSiteSubmit} 
          />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings 
            securitySettings={securitySettings} 
            setSecuritySettings={setSecuritySettings} 
            handleSecuritySubmit={handleSecuritySubmit} 
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings 
            notificationSettings={notificationSettings} 
            setNotificationSettings={setNotificationSettings} 
            handleNotificationSubmit={handleNotificationSubmit} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
