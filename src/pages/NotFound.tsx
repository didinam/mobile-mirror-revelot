
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import MainLayout from '@/components/Layout/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-6xl font-serif mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
