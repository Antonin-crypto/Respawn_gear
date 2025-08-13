import React from "react";
import "../input.css";
import { trans } from "../translations";

export default function home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Contact
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Sign up
          </a>
        </nav>
        <div>
          <input
            type="search"
            placeholder="What are you looking for?"
            className="border rounded px-2 py-1"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 bg-gray-50">
        {/* Left image section */}
        <div className="flex-1 flex items-center justify-center p-10">
          <img
            src="/path-to-your-image.png" // remplacer par ton image
            alt="Shopping and mobile"
            className="max-w-full max-h-[500px]"
          />
        </div>

        {/* Right form section */}
        <div className="w-1/3 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
          <p className="mb-4">Enter your details below</p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder={trans("signup.form.name")}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder={trans("signup.form.last_name")}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="email"
              placeholder={trans("signup.form.email")}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              placeholder={trans("signup.form.password")}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="tel"
              placeholder={trans("signup.form.phone")}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white rounded py-2 hover:bg-red-600 transition"
            >
              Create Account
            </button>
          </form>

          <button className="mt-4 w-full border border-gray-300 rounded py-2 flex justify-center items-center space-x-2 hover:bg-gray-100 transition">
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have account?{" "}
            <a href="#" className="text-red-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-20 grid grid-cols-5 gap-10 text-sm">
        <div>
          <h3 className="font-semibold mb-3">Exclusive</h3>
          <p>Subscribe</p>
          <p>Get 10% off for first order</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 p-2 rounded border border-gray-700 bg-black text-white w-full"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <p>City location, Chicago, USA 517, Bangladesh.</p>
          <p>Email: exclusive@gmail.com</p>
          <p>+023-1234-56789</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Login / Register
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Link</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Download App</h3>
          <p>Download App from App Store or Google Play</p>
          <img src="/qr-code.png" alt="QR code" className="my-4 w-24 h-24" />
          <div className="flex space-x-3">
            {/* Social icons */}
            <a href="#" className="hover:text-gray-400">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-400">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-400">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-400">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <div className="bg-black text-white text-center py-3 text-xs">
        &copy; Copyright exclusive 2022. All rights reserved.
      </div>
    </div>
  );
}
