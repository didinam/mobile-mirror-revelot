
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate an API call
    setTimeout(() => {
      // Update would happen here in a real app
      toast({
        title: "Profilis atnaujintas",
        description: "Jūsų profilio informacija sėkmingai atnaujinta",
      });
      setIsEditing(false);
      setIsUpdating(false);
    }, 1000);
  };
  
  const handlePasswordReset = () => {
    toast({
      title: "Slaptažodžio keitimas",
      description: "Instrukcija išsiųsta į jūsų el. paštą",
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Mano profilis</h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            Redaguoti
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Vardas</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Pavardė</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">El. paštas</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Atnaujinama..." : "Išsaugoti pakeitimus"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isUpdating}
              >
                Atšaukti
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vardas</h3>
                <p className="mt-1">{user?.firstName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pavardė</h3>
                <p className="mt-1">{user?.lastName}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">El. paštas</h3>
              <p className="mt-1">{user?.email}</p>
            </div>
          </div>
        )}
        
        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Slaptažodis</h3>
          <Button variant="outline" onClick={handlePasswordReset}>
            Keisti slaptažodį
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
