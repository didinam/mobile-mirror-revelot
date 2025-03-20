
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

const ProductEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewProduct = id === 'new';
  
  const [formData, setFormData] = useState<Omit<Product, 'id'> & {id?: string}>({
    title: '',
    price: 0,
    currency: 'RM',
    image: '',
    soldOut: false,
    collection: '',
    slug: ''
  });

  useEffect(() => {
    if (!isNewProduct) {
      // In a real app, you would fetch the product data from an API
      // For this demo, we're using dummy data
      if (id === '1') {
        setFormData({
          id: '1',
          title: 'Gentus 40MM | Black Chronograph Steel (Automatic)',
          price: 1599.00,
          currency: 'RM',
          image: '/lovable-uploads/7a0f7dfc-1749-4460-9161-25bb1925d0e2.png',
          soldOut: false,
          collection: 'gentus',
          slug: 'gentus-40mm-black-chronograph-steel-automatic'
        });
      }
    }
  }, [id, isNewProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to an API
    console.log('Saving product:', formData);
    
    toast({
      title: isNewProduct ? "Product created" : "Product updated",
      description: isNewProduct 
        ? "The new product has been created successfully." 
        : "The product has been updated successfully.",
    });
    
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isNewProduct ? 'Add New Product' : 'Edit Product'}
        </h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Slug
                </label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This is used for the product URL. Use only lowercase letters, numbers, and hyphens.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="RM">RM</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="collection" className="block text-sm font-medium text-gray-700 mb-1">
                  Collection
                </label>
                <Input
                  id="collection"
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="soldOut"
                  name="soldOut"
                  type="checkbox"
                  checked={formData.soldOut}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="soldOut" className="ml-2 block text-sm text-gray-700">
                  Mark as Sold Out
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image URL
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Image Preview</p>
                {formData.image ? (
                  <div className="aspect-square w-full overflow-hidden rounded border">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full bg-gray-100 flex items-center justify-center rounded border">
                    <p className="text-gray-400">No image URL provided</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isNewProduct ? 'Create Product' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditor;
