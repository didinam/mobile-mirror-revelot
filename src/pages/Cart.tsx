
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const { user } = useAuth();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <ShoppingBag className="w-20 h-20 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="px-8">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-24 sm:h-24 rounded-md overflow-hidden mb-4 sm:mb-0 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow sm:ml-6 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-base font-medium">{item.title}</h3>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    {item.attributes && item.attributes.length > 0 && (
                      <div className="mt-1 text-sm text-gray-500">
                        {item.attributes.map((attr, idx) => (
                          <span key={idx}>
                            {attr.name}: {attr.value}
                            {idx < item.attributes!.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <div className="flex border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="px-3 py-1">{item.quantity}</div>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200 flex justify-between font-medium">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <Button 
                asChild
                className="w-full"
              >
                <Link to={user ? "/checkout" : "/account/login?redirect=checkout"}>
                  Proceed to Checkout
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="w-full"
              >
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
