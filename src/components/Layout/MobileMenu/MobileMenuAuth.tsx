
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuAuthProps {
  onClose: () => void;
}

const MobileMenuAuth: React.FC<MobileMenuAuthProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    onClose();
    navigate('/');
  };
  
  return (
    <div className="px-4">
      <ul className="space-y-4">
        {user ? (
          <li className="py-2 border-b">
            <div className="space-y-3">
              <Link 
                to="/account" 
                className="block text-lg flex items-center"
                onClick={onClose}
              >
                My Account
              </Link>
              <button 
                onClick={handleLogout} 
                className="block text-lg text-red-500 mt-2"
              >
                Sign Out
              </button>
            </div>
          </li>
        ) : (
          <>
            <li className="py-2 border-b">
              <Link 
                to="/account/login" 
                className="block text-lg"
                onClick={onClose}
              >
                Sign In
              </Link>
            </li>
            <li className="py-2 border-b">
              <Link 
                to="/account/register" 
                className="block text-lg"
                onClick={onClose}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MobileMenuAuth;
