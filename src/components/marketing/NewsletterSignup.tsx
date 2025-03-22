
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // In a real application, you would send this to your API
      console.log("Newsletter signup:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Thank you!",
        description: "You've been successfully subscribed to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't sign you up. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-start mb-4">
        <Mail className="h-6 w-6 text-primary mr-2 mt-1" />
        <div>
          <h3 className="font-bold text-lg">Subscribe to our newsletter</h3>
          <p className="text-gray-600 text-sm">Get the latest updates, sales and offers.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
