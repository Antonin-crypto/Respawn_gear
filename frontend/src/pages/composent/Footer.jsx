import { MapPin, Phone, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive */}
          <div>
            <h3 className="text-xl font-bold mb-4">Respawn Gear</h3>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>17 rue du Maine, France</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>respawn_gear@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+33-00-00-00-00</span>
              </p>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/profile"
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
                  href="/panier"
                  className="hover:text-gray-300 transition-colors"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="font-semibold mb-4">Quick Link</h3>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-4">Download App</h3>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © Copyright antonin 2025. All right reserved
        </div>
      </div>
    </footer>
  );
}
export default Footer;
