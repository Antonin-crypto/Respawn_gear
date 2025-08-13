import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Produit from "./pages/Produit";
import ProductForm from "./pages/composent/product/ProductForm";
import CartPage from "./pages/Cart";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/produit" element={<Produit />} />
        <Route path="/produits/nouveau" element={<ProductForm />} />
        <Route path="/produits/modifier/:id" element={<ProductForm />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
