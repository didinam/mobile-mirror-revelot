
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const UserForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { resetPassword, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await resetPassword(email);
    
    if (success) {
      setIsSubmitted(true);
      toast({
        title: "Instrukcija išsiųsta",
        description: "Atstatymo instrukcija išsiųsta į jūsų el. paštą",
      });
    } else {
      toast({
        title: "Klaida",
        description: error || "Nepavyko išsiųsti atstatymo instrukcijos",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <KeyRound className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Slaptažodžio atstatymas</h1>
          <p className="text-gray-600 mt-2">
            Įveskite savo el. paštą ir mes atsiųsime jums instrukcijas, kaip atstatyti slaptažodį
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-700">
                Atstatymo instrukcija išsiųsta į <strong>{email}</strong>
              </p>
              <p className="text-green-600 mt-2 text-sm">
                Patikrinkite savo el. paštą ir sekite instrukcijas slaptažodžio atstatymui.
              </p>
            </div>
            
            <Link to="/account/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Grįžti į prisijungimą
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            <Button
              type="submit"
              className="w-full bg-primary"
              disabled={isLoading}
            >
              {isLoading ? "Siunčiama..." : "Atstatyti slaptažodį"}
            </Button>
            
            <div className="text-center">
              <Link to="/account/login" className="text-sm text-gray-600 hover:text-primary">
                <ArrowLeft className="inline-block mr-1 h-4 w-4" /> Grįžti į prisijungimą
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserForgotPassword;
