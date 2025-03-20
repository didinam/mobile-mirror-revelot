
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageItem {
  id: string;
  title: string;
  url: string;
  usedIn: string[];
}

const ImagesAdmin = () => {
  const { toast } = useToast();
  // Dummy images data - in a real app, this would come from an API
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      title: 'Watch Front View',
      url: '/lovable-uploads/7a0f7dfc-1749-4460-9161-25bb1925d0e2.png',
      usedIn: ['Product Detail']
    },
    {
      id: '2',
      title: 'Hero Image',
      url: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      usedIn: ['Home Page', 'Collection']
    },
  ]);

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(image => image.id !== id));
    }
  };

  const handleUpload = () => {
    toast({
      title: "Upload functionality",
      description: "In a real app, this would open a file upload dialog.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Image Gallery</h1>
        <Button onClick={handleUpload}>
          <Upload size={16} className="mr-2" />
          Upload Images
        </Button>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search Images
          </label>
          <Input id="search" placeholder="Search by title..." className="mt-1" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {images.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{image.title}</h3>
                <div className="text-sm text-gray-500 mb-2">
                  Used in: {image.usedIn.join(', ')}
                </div>
                <div className="flex justify-between mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    Replace
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesAdmin;
