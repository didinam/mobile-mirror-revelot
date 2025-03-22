
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Search, Tag } from 'lucide-react';

interface SeoSettingsProps {
  seoSettings: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    siteName: string;
    titleSeparator: string;
    robotsTxt: string;
    canonicalUrl: string;
    ogImage: string;
  };
  setSeoSettings: React.Dispatch<React.SetStateAction<{
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    siteName: string;
    titleSeparator: string;
    robotsTxt: string;
    canonicalUrl: string;
    ogImage: string;
  }>>;
  handleSeoSubmit: (e: React.FormEvent) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({ 
  seoSettings, 
  setSeoSettings,
  handleSeoSubmit 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          SEO Settings
        </CardTitle>
        <CardDescription>
          Configure search engine optimization settings to improve your store's visibility online.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSeoSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <FormLabel htmlFor="siteName">Site Name</FormLabel>
            <Input 
              id="siteName" 
              value={seoSettings.siteName}
              onChange={(e) => setSeoSettings({...seoSettings, siteName: e.target.value})}
            />
            <FormDescription>
              The name of your site used in titles and meta tags.
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="defaultTitle">Default Page Title</FormLabel>
            <Input 
              id="defaultTitle" 
              value={seoSettings.defaultTitle}
              onChange={(e) => setSeoSettings({...seoSettings, defaultTitle: e.target.value})}
            />
            <FormDescription>
              Default title used when no specific page title is set.
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="titleSeparator">Title Separator</FormLabel>
            <Input 
              id="titleSeparator" 
              value={seoSettings.titleSeparator}
              onChange={(e) => setSeoSettings({...seoSettings, titleSeparator: e.target.value})}
              placeholder="|"
              maxLength={5}
              className="max-w-[100px]"
            />
            <FormDescription>
              Character that separates parts of the title (e.g. "Page Title | Site Name").
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="defaultDescription">Default Meta Description</FormLabel>
            <Textarea 
              id="defaultDescription" 
              value={seoSettings.defaultDescription}
              onChange={(e) => setSeoSettings({...seoSettings, defaultDescription: e.target.value})}
              rows={3}
            />
            <FormDescription className="flex items-center">
              <span>Keep under 160 characters for optimal SEO </span>
              <span className={`ml-2 text-xs ${
                seoSettings.defaultDescription.length > 160 ? 'text-red-500' : 'text-green-500'
              }`}>
                ({seoSettings.defaultDescription.length}/160)
              </span>
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="defaultKeywords">Default Meta Keywords</FormLabel>
            <Input 
              id="defaultKeywords" 
              value={seoSettings.defaultKeywords}
              onChange={(e) => setSeoSettings({...seoSettings, defaultKeywords: e.target.value})}
              placeholder="watches, luxury, timepieces"
            />
            <FormDescription>
              Comma-separated list of keywords (less important for modern SEO but still used by some engines).
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="canonicalUrl">Canonical URL</FormLabel>
            <Input 
              id="canonicalUrl" 
              value={seoSettings.canonicalUrl}
              onChange={(e) => setSeoSettings({...seoSettings, canonicalUrl: e.target.value})}
              placeholder="https://www.yourstore.com"
            />
            <FormDescription>
              The main URL of your site, used to prevent duplicate content issues.
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="ogImage">Default Social Media Image</FormLabel>
            <Input 
              id="ogImage" 
              value={seoSettings.ogImage}
              onChange={(e) => setSeoSettings({...seoSettings, ogImage: e.target.value})}
              placeholder="https://www.yourstore.com/og-image.jpg"
            />
            <FormDescription>
              Image that appears when your site is shared on social media.
            </FormDescription>
          </div>
          
          <div className="space-y-2">
            <FormLabel htmlFor="robotsTxt">Robots.txt Content</FormLabel>
            <Textarea 
              id="robotsTxt" 
              value={seoSettings.robotsTxt}
              onChange={(e) => setSeoSettings({...seoSettings, robotsTxt: e.target.value})}
              rows={5}
              className="font-mono text-sm"
            />
            <FormDescription>
              Controls how search engines crawl and index your site.
            </FormDescription>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save SEO Settings
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SeoSettings;
