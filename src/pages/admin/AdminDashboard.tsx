
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Products"
          value="1"
          description="Total products in store"
          link="/admin/products"
          linkText="Manage Products"
          color="bg-blue-500"
        />
        
        <DashboardCard
          title="Images"
          value="3"
          description="Product images"
          link="/admin/images"
          linkText="Manage Images"
          color="bg-green-500"
        />
        
        <DashboardCard
          title="Content Blocks"
          value="5"
          description="Editable content sections"
          link="/admin/content"
          linkText="Edit Content"
          color="bg-purple-500"
        />
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionButton 
            label="Add New Product" 
            link="/admin/products/new" 
          />
          <QuickActionButton 
            label="Update Home Page" 
            link="/admin/content/home" 
          />
          <QuickActionButton 
            label="Upload New Images" 
            link="/admin/images/upload" 
          />
          <QuickActionButton 
            label="Edit Product Details" 
            link="/admin/products" 
          />
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  link: string;
  linkText: string;
  color: string;
}

const DashboardCard = ({ title, value, description, link, linkText, color }: DashboardCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <div className={`${color} w-10 h-10 flex items-center justify-center rounded-full text-white mr-3`}>
        {value}
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <a href={link} className="text-blue-600 hover:underline text-sm">
      {linkText} →
    </a>
  </div>
);

interface QuickActionButtonProps {
  label: string;
  link: string;
}

const QuickActionButton = ({ label, link }: QuickActionButtonProps) => (
  <a 
    href={link} 
    className="flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
  >
    {label}
  </a>
);

export default AdminDashboard;
