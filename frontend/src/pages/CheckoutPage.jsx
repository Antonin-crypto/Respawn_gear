import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CreditCard,
  Truck,
} from "lucide-react";
import logo from "../pages/composent/images/Logo de Respawn Gear.png";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [couponCode, setCouponCode] = useState("");

  const cartItems = [
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop",
    },
    {
      id: 2,
      name: "Hi Gamepad",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=80&h=80&fit=crop",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Commande passée:", { formData, paymentMethod, cartItems });
    alert("Commande passée avec succès !");
  };

  const applyCoupon = () => {
    console.log("Code promo appliqué:", couponCode);
    alert("Code promo appliqué !");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bannière promotionnelle */}
      <div className="bg-black text-white text-center py-2 px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="font-semibold underline ml-2 cursor-pointer">
              ShopNow
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">English</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img
              src={logo}
              alt="Shopping and mobile"
              className="h-12 w-auto object-contain"
            />

            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-black border-b-2 border-transparent hover:border-black transition-all"
              >
                Home
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-black border-b-2 border-transparent hover:border-black transition-all"
              >
                Contact
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-black border-b-2 border-transparent hover:border-black transition-all"
              >
                About
              </a>
              <a
                href="/signup"
                className="text-gray-700 hover:text-black border-b-2 border-transparent hover:border-black transition-all"
              >
                Sign Up
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="bg-gray-100 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Heart className="h-6 w-6 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
              <User className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="/" className="hover:text-black transition-colors">
            Account
          </a>
          <span>/</span>
          <a href="/cart" className="hover:text-black transition-colors">
            My Account
          </a>
          <span>/</span>
          <a href="/checkout" className="hover:text-black transition-colors">
            Product
          </a>
          <span>/</span>
          <a href="/cart" className="hover:text-black transition-colors">
            View Cart
          </a>
          <span>/</span>
          <span className="text-black font-medium">CheckOut</span>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Billing Details
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de facturation */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address*
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town/City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="space-y-6">
            {/* Articles du panier */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="bank"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Bank
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="cash"
                  className="text-sm font-medium text-gray-700"
                >
                  Cash on delivery
                </label>
              </div>

              {/* Icônes de cartes de crédit */}
              <div className="flex items-center space-x-2 ml-7">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                  AE
                </div>
              </div>
            </div>

            {/* Code promo */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={applyCoupon}
                className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium"
              >
                Apply Coupon
              </button>
            </div>

            {/* Bouton de commande */}
            <button
              onClick={handleSubmit}
              className="w-full bg-red-500 text-white py-4 rounded hover:bg-red-600 transition-colors font-semibold text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Exclusive */}
            <div>
              <h3 className="text-xl font-bold mb-4">Exclusive</h3>
              <h4 className="font-semibold mb-4">Subscribe</h4>
              <p className="text-sm mb-4">Get 10% off your first order</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border border-white px-3 py-2 rounded-l flex-1 text-sm focus:outline-none"
                />
                <button className="bg-white text-black px-3 py-2 rounded-r hover:bg-gray-200 transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>exclusive@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+88015-88888-9999</span>
                </p>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/account"
                    className="hover:text-gray-300 transition-colors"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Login / Register
                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Cart
                  </a>
                </li>
                <li>
                  <a
                    href="/wishlist"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Wishlist
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Shop
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Link */}
            <div>
              <h3 className="font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="hover:text-gray-300 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-semibold mb-4">Download App</h3>
              <p className="text-xs text-gray-400 mb-4">
                Save $3 with App New User Only
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                  <div className="w-16 h-16 bg-black rounded grid grid-cols-8 gap-0.5 p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? "bg-white" : "bg-black"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white text-black px-3 py-1 rounded text-xs flex items-center space-x-2">
                    <span>📱</span>
                    <span>Google Play</span>
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded text-xs flex items-center space-x-2">
                    <span>🍎</span>
                    <span>App Store</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-blue-300 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
