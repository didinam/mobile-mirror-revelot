
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Heart, Trash, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleAddToCart = (productId: string, title: string, price: number, image: string, slug: string) => {
    const productToAdd: Product = {
      id: productId,
      title,
      price,
      currency: 'RM',
      image,
      collection: '',
      slug
    };
    
    addToCart(productToAdd, 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <Heart className="w-20 h-20 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">You haven't saved any products to your wishlist yet.</p>
          <Button asChild className="px-8">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearWishlist}
          className="text-sm"
        >
          <Trash className="w-4 h-4 mr-2" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <Link to={`/products/${item.slug}`} className="block">
                <h3 className="text-lg font-medium mb-2 hover:underline">{item.title}</h3>
              </Link>
              
              <p className="text-lg font-medium mb-4">RM {item.price.toFixed(2)}</p>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleAddToCart(
                    item.productId, 
                    item.title, 
                    item.price, 
                    item.image,
                    item.slug
                  )}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => removeFromWishlist(item.productId)}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
