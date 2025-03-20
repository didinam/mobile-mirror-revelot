
import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  
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
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/admin/products" icon={<ShoppingBag size={18} />} label="Products" />
          <NavItem to="/admin/images" icon={<Image size={18} />} label="Images" />
          <NavItem to="/admin/content" icon={<FileText size={18} />} label="Content" />
          <NavItem to="/admin/settings" icon={<Settings size={18} />} label="Settings" />
          
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
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <Link to={to} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default AdminLayout;
