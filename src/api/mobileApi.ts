
import { Product, CartItem, WishlistItem, Promotion } from '@/types';

// This file would normally interact with actual backend endpoints,
// but for demonstration purposes, we're mocking API responses

// Base URL for the API
const API_BASE_URL = 'https://api.example.com/v1';

/**
 * Helper function to simulate API requests with different response times and optional errors
 */
const mockApiRequest = async <T>(
  data: T, 
  options: { delay?: number; shouldFail?: boolean; errorMessage?: string } = {}
): Promise<T> => {
  const { delay = 500, shouldFail = false, errorMessage = 'An error occurred' } = options;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (shouldFail) {
    throw new Error(errorMessage);
  }
  
  return data;
};

/**
 * Authentication API
 */
export const authApi = {
  login: async (email: string, password: string) => {
    // In a real implementation, this would call the backend API
    console.log('API: Login attempt for', email);
    
    if (email === 'user@example.com' && password === 'password') {
      return mockApiRequest({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date().toISOString(),
        }
      });
    } else {
      return mockApiRequest(null, { 
        shouldFail: true, 
        errorMessage: 'Invalid email or password' 
      });
    }
  },
  
  register: async (email: string, password: string, firstName: string, lastName: string) => {
    console.log('API: Register attempt for', email);
    
    // Simulate validation
    if (!email.includes('@')) {
      return mockApiRequest(null, { 
        shouldFail: true, 
        errorMessage: 'Invalid email format' 
      });
    }
    
    return mockApiRequest({
      token: 'mock-jwt-token',
      user: {
        id: Math.floor(Math.random() * 1000 + 1).toString(),
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      }
    });
  },
  
  resetPassword: async (email: string) => {
    console.log('API: Password reset for', email);
    return mockApiRequest({ success: true });
  }
};

/**
 * Products API
 */
export const productsApi = {
  getProducts: async (params?: { 
    page?: number; 
    limit?: number; 
    collection?: string;
    search?: string;
    sort?: string;
  }) => {
    console.log('API: Fetching products with params', params);
    
    // Simulate a product list that would come from the backend
    const products: Product[] = Array.from({ length: 10 }).map((_, index) => ({
      id: (index + 1).toString(),
      title: `Product ${index + 1}`,
      price: 100 + index * 10,
      currency: 'USD',
      image: `/placeholder.svg`,
      collection: params?.collection || 'default',
      slug: `product-${index + 1}`,
      stock: 10 + index,
      inStock: true,
    }));
    
    return mockApiRequest({
      products,
      totalCount: 100,
      page: params?.page || 1,
      totalPages: 10,
    });
  },
  
  getProductBySlug: async (slug: string) => {
    console.log('API: Fetching product with slug', slug);
    
    // Simulate product detail
    const product: Product = {
      id: '1',
      title: 'Sample Product',
      price: 199.99,
      currency: 'USD',
      image: `/placeholder.svg`,
      collection: 'featured',
      slug,
      description: 'This is a sample product description.',
      stock: 15,
      inStock: true,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    };
    
    return mockApiRequest(product);
  },
};

/**
 * Cart API
 */
export const cartApi = {
  getCart: async () => {
    console.log('API: Fetching cart');
    
    const cartItems: CartItem[] = [
      {
        id: '1',
        productId: '1',
        title: 'Sample Product 1',
        price: 199.99,
        quantity: 1,
        image: '/placeholder.svg',
      },
      {
        id: '2',
        productId: '2',
        title: 'Sample Product 2',
        price: 99.99,
        quantity: 2,
        image: '/placeholder.svg',
      },
    ];
    
    return mockApiRequest({
      items: cartItems,
      subtotal: 399.97,
      shipping: 10,
      tax: 40,
      total: 449.97,
    });
  },
  
  addToCart: async (productId: string, quantity: number, variantId?: string) => {
    console.log('API: Adding to cart', { productId, quantity, variantId });
    
    return mockApiRequest({
      success: true,
      message: 'Product added to cart',
    });
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    console.log('API: Updating cart item', { itemId, quantity });
    
    return mockApiRequest({
      success: true,
      message: 'Cart updated',
    });
  },
  
  removeFromCart: async (itemId: string) => {
    console.log('API: Removing from cart', { itemId });
    
    return mockApiRequest({
      success: true,
      message: 'Item removed from cart',
    });
  },
  
  applyPromotion: async (code: string) => {
    console.log('API: Applying promotion', { code });
    
    if (code === 'INVALID') {
      return mockApiRequest(null, {
        shouldFail: true,
        errorMessage: 'Invalid promotion code',
      });
    }
    
    return mockApiRequest({
      success: true,
      discount: 20,
      message: 'Promotion applied successfully',
    });
  },
};

/**
 * Wishlist API
 */
export const wishlistApi = {
  getWishlist: async () => {
    console.log('API: Fetching wishlist');
    
    const wishlistItems: WishlistItem[] = [
      {
        id: '1',
        productId: '1',
        title: 'Sample Product 1',
        price: 199.99,
        image: '/placeholder.svg',
        addedAt: new Date().toISOString(),
        slug: 'sample-product-1',
      },
    ];
    
    return mockApiRequest({ items: wishlistItems });
  },
  
  addToWishlist: async (productId: string) => {
    console.log('API: Adding to wishlist', { productId });
    
    return mockApiRequest({
      success: true,
      message: 'Product added to wishlist',
    });
  },
  
  removeFromWishlist: async (productId: string) => {
    console.log('API: Removing from wishlist', { productId });
    
    return mockApiRequest({
      success: true,
      message: 'Product removed from wishlist',
    });
  },
};

/**
 * Checkout API
 */
export const checkoutApi = {
  createCheckout: async (cartItems: CartItem[], shippingInfo: any, billingInfo: any) => {
    console.log('API: Creating checkout', { items: cartItems.length, shippingInfo, billingInfo });
    
    return mockApiRequest({
      checkoutId: 'chk_' + Math.random().toString(36).substring(2, 15),
      status: 'pending',
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
  },
  
  processPayment: async (checkoutId: string, paymentInfo: any) => {
    console.log('API: Processing payment', { checkoutId, paymentInfo });
    
    return mockApiRequest({
      success: true,
      orderId: 'ord_' + Math.random().toString(36).substring(2, 15),
      status: 'paid',
    });
  },
};

/**
 * Order API
 */
export const orderApi = {
  getOrders: async () => {
    console.log('API: Fetching orders');
    
    return mockApiRequest({
      orders: [
        {
          id: 'ord_123',
          date: new Date().toISOString(),
          status: 'delivered',
          total: 249.99,
          items: 2,
        },
        {
          id: 'ord_456',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'processing',
          total: 99.99,
          items: 1,
        },
      ],
    });
  },
  
  getOrderDetails: async (orderId: string) => {
    console.log('API: Fetching order details', { orderId });
    
    return mockApiRequest({
      id: orderId,
      date: new Date().toISOString(),
      status: 'delivered',
      total: 249.99,
      subtotal: 229.99,
      shipping: 10,
      tax: 10,
      items: [
        {
          id: '1',
          productId: '1',
          title: 'Sample Product 1',
          price: 199.99,
          quantity: 1,
          image: '/placeholder.svg',
        },
        {
          id: '2',
          productId: '2',
          title: 'Sample Product 2',
          price: 29.99,
          quantity: 1,
          image: '/placeholder.svg',
        },
      ],
      shipping: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'US',
      },
    });
  },
  
  trackOrder: async (trackingId: string) => {
    console.log('API: Tracking order', { trackingId });
    
    return mockApiRequest({
      orderId: 'ord_123',
      status: 'in_transit',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      trackingEvents: [
        {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'order_placed',
          location: 'Online',
        },
        {
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'processing',
          location: 'Warehouse',
        },
        {
          date: new Date().toISOString(),
          status: 'shipped',
          location: 'Distribution Center',
        },
      ],
    });
  },
};

/**
 * User API
 */
export const userApi = {
  getProfile: async () => {
    console.log('API: Fetching user profile');
    
    return mockApiRequest({
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      phone: '+1234567890',
      defaultShippingAddress: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'US',
      },
    });
  },
  
  updateProfile: async (profileData: any) => {
    console.log('API: Updating user profile', profileData);
    
    return mockApiRequest({
      success: true,
      message: 'Profile updated successfully',
    });
  },
  
  getAddresses: async () => {
    console.log('API: Fetching user addresses');
    
    return mockApiRequest({
      addresses: [
        {
          id: '1',
          name: 'Home',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          country: 'US',
          isDefault: true,
        },
        {
          id: '2',
          name: 'Work',
          address: '456 Corporate Ave',
          city: 'Business City',
          state: 'NY',
          zip: '67890',
          country: 'US',
          isDefault: false,
        },
      ],
    });
  },
};

// Export a unified API object
export const mobileApi = {
  auth: authApi,
  products: productsApi,
  cart: cartApi,
  wishlist: wishlistApi,
  checkout: checkoutApi,
  orders: orderApi,
  user: userApi,
};

export default mobileApi;
