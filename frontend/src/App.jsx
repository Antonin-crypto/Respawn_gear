import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Produit from "./pages/Produit";
import ProductForm from "./pages/composent/product/ProductForm";
import CartPage from "./pages/Cart";
import Home from "./pages/Home";
import ProtectedRoute from "../src/pages/composent/admin/ProtectedRoute";
import ProductId from "./pages/composent/product/ProductId";
import { CartProvider } from "./pages/contexts/CartContext";
import Page404 from "./pages/page404";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit_profile" element={<EditProfile />} />
          <Route
            path="/produit"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Produit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produits/nouveau"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route path="/produits/:id" element={<ProductId />} />
          <Route
            path="/produits/modifier/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
