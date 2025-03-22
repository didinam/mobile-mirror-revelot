
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WishlistItem } from '../types';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  const addToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      toast('Already in wishlist', {
        description: `${product.title} is already in your wishlist.`
      });
      return;
    }
    
    const newItem: WishlistItem = {
      id: `wishlist_${product.id}_${Date.now()}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      addedAt: new Date().toISOString(),
      slug: product.slug
    };
    
    setWishlistItems(prev => [...prev, newItem]);
    
    toast('Added to wishlist', {
      description: `${product.title} has been added to your wishlist.`
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => {
      const filtered = prev.filter(item => item.productId !== productId);
      
      if (filtered.length < prev.length) {
        toast('Removed from wishlist', {
          description: 'Item removed from your wishlist.'
        });
      }
      
      return filtered;
    });
  };
  
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    toast('Wishlist cleared', {
      description: 'All items have been removed from your wishlist.'
    });
  };
  
  const totalItems = wishlistItems.length;
  
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        totalItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
