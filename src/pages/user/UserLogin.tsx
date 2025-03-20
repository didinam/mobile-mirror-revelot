
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Sėkmingai prisijungta",
        description: "Sveiki sugrįžę į savo paskyrą",
      });
      navigate('/account');
    } else {
      toast({
        title: "Klaida",
        description: error || "Nepavyko prisijungti, patikrinkite savo duomenis",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Prisijungimas</h1>
          <p className="text-gray-600 mt-2">Prisijunkite prie savo paskyros</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">El. paštas</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="jusu@pastas.lt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Slaptažodis</Label>
              <Link to="/account/forgot-password" className="text-sm text-primary hover:underline">
                Pamiršote slaptažodį?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              "Jungiamasi..."
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Prisijungti
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Neturite paskyros?{" "}
            <Link to="/account/register" className="text-primary hover:underline">
              Registruotis
            </Link>
          </p>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Demo prisijungimui naudokite:<br />
            El. paštas: user@example.com<br />
            Slaptažodis: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
