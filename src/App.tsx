
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import OrderTracking from "./pages/OrderTracking";

// Admin components
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ImagesAdmin from "./pages/admin/ImagesAdmin";
import ContentAdmin from "./pages/admin/ContentAdmin";
import ProductEditor from "./pages/admin/ProductEditor";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import OrderAdminDetail from "./pages/admin/OrderAdminDetail";
import CustomersAdmin from "./pages/admin/CustomersAdmin";
import AnalyticsAdmin from "./pages/admin/AnalyticsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

// User components
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserAccount from "./pages/user/UserAccount";
import UserOrders from "./pages/user/UserOrders";
import UserProfile from "./pages/user/UserProfile";
import UserForgotPassword from "./pages/user/UserForgotPassword";
import OrderDetail from "./pages/user/OrderDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/collections/:collection" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
            <Route path="/track-order/:id" element={<OrderTracking />} />
            
            {/* User Routes */}
            <Route path="/account/login" element={<UserLogin />} />
            <Route path="/account/register" element={<UserRegister />} />
            <Route path="/account/forgot-password" element={<UserForgotPassword />} />
            <Route path="/account" element={<UserAccount />}>
              <Route index element={<UserProfile />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
            </Route>
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="products/new" element={<ProductEditor />} />
            <Route path="products/edit/:id" element={<ProductEditor />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="orders/:id" element={<OrderAdminDetail />} />
            <Route path="customers" element={<CustomersAdmin />} />
            <Route path="analytics" element={<AnalyticsAdmin />} />
            <Route path="images" element={<ImagesAdmin />} />
            <Route path="content" element={<ContentAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
