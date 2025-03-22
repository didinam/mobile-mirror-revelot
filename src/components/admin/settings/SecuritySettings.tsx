
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ShieldCheck, Key, Lock, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ApiKey, SecurityLog } from '@/types';

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
  // Sample API keys for the demonstration
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Mobile App API Key',
      key: 'sk_mobile_***********************************',
      permissions: ['read:products', 'read:orders', 'write:cart'],
      createdAt: '2023-09-15T10:30:00Z',
      lastUsed: '2023-10-20T14:25:32Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Analytics Integration',
      key: 'sk_analytics_******************************',
      permissions: ['read:products', 'read:orders', 'read:customers'],
      createdAt: '2023-08-03T09:15:00Z',
      lastUsed: '2023-10-19T11:42:18Z',
      status: 'active'
    }
  ]);

  // Sample security logs for the demonstration
  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      userId: 'admin1',
      event: 'login',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      timestamp: '2023-10-20T10:45:23Z'
    },
    {
      id: '2',
      userId: 'admin1',
      event: 'password_change',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      timestamp: '2023-10-15T14:30:12Z'
    },
    {
      id: '3',
      userId: 'unknown',
      event: 'failed_login',
      ip: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2023-10-12T23:15:43Z',
      details: 'Incorrect password attempt for user: admin1'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleCreateApiKey = () => {
    if (!newKeyName) return;
    
    const newKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}`,
      permissions: selectedPermissions,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setSelectedPermissions([]);
  };

  const handleRevokeKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' } : key
    ));
  };

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general" className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          General
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          API Keys
        </TabsTrigger>
        <TabsTrigger value="logs" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Security Logs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
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
      
      <TabsContent value="api">
        <Card>
          <CardHeader>
            <CardTitle>API Key Management</CardTitle>
            <CardDescription>
              Create and manage API keys for third-party integrations and mobile applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your API Keys</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map(key => (
                    <TableRow key={key.id}>
                      <TableCell>{key.name}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          key.status === 'active' ? 'bg-green-100 text-green-800' :
                          key.status === 'revoked' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {key.status === 'active' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRevokeKey(key.id)}
                          >
                            Revoke
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Create New API Key</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="keyName">Key Name</FormLabel>
                  <Input
                    id="keyName"
                    placeholder="e.g., Mobile App Integration"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Permissions</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {['read:products', 'write:products', 'read:orders', 'write:orders', 'read:customers', 'write:cart'].map(perm => (
                      <div key={perm} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`perm-${perm}`}
                          checked={selectedPermissions.includes(perm)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions([...selectedPermissions, perm]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`perm-${perm}`} className="text-sm">{perm}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button onClick={handleCreateApiKey} disabled={!newKeyName || selectedPermissions.length === 0}>
                  Create API Key
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs">
        <Card>
          <CardHeader>
            <CardTitle>Security Logs</CardTitle>
            <CardDescription>
              Review security-related activities and events on your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.event === 'login' ? 'bg-green-100 text-green-800' :
                        log.event === 'logout' ? 'bg-blue-100 text-blue-800' :
                        log.event === 'password_change' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.event.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.details || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SecuritySettings;
