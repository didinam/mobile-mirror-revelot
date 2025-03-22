
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Globe } from 'lucide-react';

interface SiteSettingsProps {
  siteSettings: {
    siteTitle: string;
    metaDescription: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    googleAnalyticsId: string;
  };
  setSiteSettings: React.Dispatch<React.SetStateAction<{
    siteTitle: string;
    metaDescription: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    googleAnalyticsId: string;
  }>>;
  handleSiteSubmit: (e: React.FormEvent) => void;
}

const SiteSettings: React.FC<SiteSettingsProps> = ({ 
  siteSettings, 
  setSiteSettings,
  handleSiteSubmit 
}) => {
  return (
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
  );
};

export default SiteSettings;
