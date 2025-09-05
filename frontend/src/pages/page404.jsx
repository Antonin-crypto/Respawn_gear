import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import HeaderPage from "./composent/Header_page";

export default function Page404() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Email souscrit:", email);
    setEmail("");
    alert("Merci pour votre abonnement !");
  };

  const handleBackToHome = () => {
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bannière promotionnelle */}
      <HeaderPage></HeaderPage>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="/home" className="hover:text-black transition-colors">
            Home
          </a>
          <span>/</span>
          <span>404 Error</span>
        </div>
      </div>

      {/* Contenu principal 404 */}
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-black mb-6">
            404 Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Your visited page not found. You may go home page.
          </p>
          <button
            onClick={handleBackToHome}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors font-medium"
          >
            Back to home page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-white px-3 py-2 rounded-l flex-1 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-black px-3 py-2 rounded-r hover:bg-gray-200 transition-colors"
                >
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

              {/* QR Code placeholder */}
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

              {/* Social Media */}
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-blue-300 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
