
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Layout
import MainLayout from './components/Layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Main Pages
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import OrderTracking from './pages/OrderTracking';
import NotFound from './pages/NotFound';

// User Pages
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';
import UserForgotPassword from './pages/user/UserForgotPassword';
import UserAccount from './pages/user/UserAccount';
import UserOrders from './pages/user/UserOrders';
import UserProfile from './pages/user/UserProfile';
import OrderDetail from './pages/user/OrderDetail';

// Admin Pages
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import OrderAdminDetail from './pages/admin/OrderAdminDetail';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import ContentAdmin from './pages/admin/ContentAdmin';
import ImagesAdmin from './pages/admin/ImagesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import ProductEditor from './pages/admin/ProductEditor';

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Routes>
                  {/* Main Routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:slug" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="checkout/confirmation" element={<CheckoutConfirmation />} />
                    <Route path="tracking" element={<OrderTracking />} />
                    
                    {/* User Account Routes */}
                    <Route path="account/login" element={<UserLogin />} />
                    <Route path="account/register" element={<UserRegister />} />
                    <Route path="account/forgot-password" element={<UserForgotPassword />} />
                    <Route path="account" element={<UserAccount />} />
                    <Route path="account/orders" element={<UserOrders />} />
                    <Route path="account/orders/:id" element={<OrderDetail />} />
                    <Route path="account/profile" element={<UserProfile />} />
                    
                    {/* 404 Page */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductsAdmin />} />
                    <Route path="products/:id" element={<ProductEditor />} />
                    <Route path="orders" element={<OrdersAdmin />} />
                    <Route path="orders/:id" element={<OrderAdminDetail />} />
                    <Route path="customers" element={<CustomersAdmin />} />
                    <Route path="analytics" element={<AnalyticsAdmin />} />
                    <Route path="content" element={<ContentAdmin />} />
                    <Route path="images" element={<ImagesAdmin />} />
                    <Route path="settings" element={<SettingsAdmin />} />
                  </Route>
                </Routes>
              </Router>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
