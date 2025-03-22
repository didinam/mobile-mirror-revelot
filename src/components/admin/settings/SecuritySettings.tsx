
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ShieldCheck } from 'lucide-react';

interface SecuritySettingsProps {
  securitySettings: {
    twoFactorAuth: boolean;
    passwordExpiration: number;
    ipRestriction: boolean;
    automaticLogout: number;
  };
  setSecuritySettings: React.Dispatch<React.SetStateAction<{
    twoFactorAuth: boolean;
    passwordExpiration: number;
    ipRestriction: boolean;
    automaticLogout: number;
  }>>;
  handleSecuritySubmit: (e: React.FormEvent) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  securitySettings, 
  setSecuritySettings,
  handleSecuritySubmit 
}) => {
  return (
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
  );
};

export default SecuritySettings;
