
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image, 
  FileText, 
  Settings, 
  LogOut,
  Users,
  Package,
  BarChart4,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search across the admin panel
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <nav className="p-4 space-y-1">
          <NavItem 
            to="/admin/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            active={location.pathname === '/admin/dashboard'}
          />
          <NavItem 
            to="/admin/products" 
            icon={<ShoppingBag size={18} />} 
            label="Products" 
            active={location.pathname.includes('/admin/products')}
          />
          <NavItem 
            to="/admin/orders" 
            icon={<Package size={18} />} 
            label="Orders" 
            active={location.pathname.includes('/admin/orders')}
          />
          <NavItem 
            to="/admin/customers" 
            icon={<Users size={18} />} 
            label="Customers" 
            active={location.pathname.includes('/admin/customers')}
          />
          <NavItem 
            to="/admin/analytics" 
            icon={<BarChart4 size={18} />} 
            label="Analytics" 
            active={location.pathname.includes('/admin/analytics')}
          />
          <NavItem 
            to="/admin/images" 
            icon={<Image size={18} />} 
            label="Images" 
            active={location.pathname === '/admin/images'}
          />
          <NavItem 
            to="/admin/content" 
            icon={<FileText size={18} />} 
            label="Content" 
            active={location.pathname === '/admin/content'}
          />
          <NavItem 
            to="/admin/settings" 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={location.pathname === '/admin/settings'}
          />
          
          <div className="pt-6 mt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={`flex items-center p-2 rounded-md ${
      active 
        ? 'bg-gray-100 text-primary font-medium' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default AdminLayout;
