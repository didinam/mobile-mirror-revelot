
import React from 'react';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserAccount = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Navigate to="/account/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Mano paskyra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div className="pb-4 border-b">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
                <h2 className="text-center font-medium">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-center text-sm text-gray-500">{user.email}</p>
              </div>
              
              <nav className="space-y-1">
                <NavLink 
                  to="/account" 
                  end
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <User className="mr-3 h-4 w-4" />
                  Profilis
                </NavLink>
                
                <NavLink 
                  to="/account/orders" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <ShoppingBag className="mr-3 h-4 w-4" />
                  Užsakymai
                </NavLink>
              </nav>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Atsijungti
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
