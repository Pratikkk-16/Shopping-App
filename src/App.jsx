import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider,useAuth } from "./Context/AuthContext";
import { CartProvider } from  "./Context/CartContext";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import "./App.css";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;