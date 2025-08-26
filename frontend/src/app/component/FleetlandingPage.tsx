'use client';
import React from "react";
import axios from "axios";
import Image from "next/image";
import Icon from "../assets/cube.png";
import { useRouter } from 'next/navigation';
import { useUserStore } from './zustand';

export default function FleetLandingPage() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  function subscribeToNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      alert("Email is required");
      return;
    }

    axios
      .post("http://localhost:8080/origin/newsLetter", { email })
      .then((response) => {
        console.log("Success:", response.data);
        alert("Subscribed successfully!");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
          alert(`Subscription failed: ${error.response.data}`);
        } else {
          alert("Subscription failed. Please try again.");
        }
      });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Header Navigation */}
      <header className="bg-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Left Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <button className="text-white font-semibold text-sm lg:text-base hover:text-gray-300 transition-colors">
                Solutions
              </button>
              <button className="text-white font-semibold text-sm lg:text-base hover:text-gray-300 transition-colors">
                Products
              </button>
              <button className="text-white font-semibold text-sm lg:text-base hover:text-gray-300 transition-colors">
                About
              </button>
              <button
                className="text-white font-semibold text-sm lg:text-base hover:text-gray-300 transition-colors"
                onClick={() => router.push("/companydashboard")}
              >
                Dashboard
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Center Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src={Icon}
                alt="FleetOps Logo"
                className="h-8 w-8 lg:h-10 lg:w-10"
                width={40}
                height={40}
              />
              <span className="text-white text-xl lg:text-2xl font-bold">
                FleetOps
              </span>
            </div>

            {/* Right Authentication Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <button
                    className="text-white border border-white px-4 py-2 text-sm hover:bg-white hover:text-gray-800 transition-colors rounded"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="text-white border border-white px-4 py-2 text-sm hover:bg-white hover:text-gray-800 transition-colors rounded"
                    onClick={() => router.push("/login")}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="text-white border border-white px-4 py-2 text-sm hover:bg-white hover:text-gray-800 transition-colors rounded"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dffepahvl/image/upload/v1754121310/cvwrznzx1hnkrfqot8z1.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
            Control Your Fleet
            <br />
            <span className="text-blue-400">Like Never Before</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
            Real-time tracking, advanced analytics, and seamless management –
            all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Useful for Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our technologies enhance business efficiency and driver safety with measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Time Saving Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Time Saving</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">20%</h3>
              <p className="text-lg font-semibold text-gray-700 mb-3">Less Mundanity</p>
              <p className="text-gray-600">
                Process automation frees you to focus on strategic tasks that drive growth.
              </p>
            </div>

            {/* Safety Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Safety</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">50%</h3>
              <p className="text-lg font-semibold text-gray-700 mb-3">Fewer Accidents</p>
              <p className="text-gray-600">
                Advanced driver behavior analysis significantly improves road safety for your fleet.
              </p>
            </div>

            {/* Efficiency Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Efficiency</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">30%</h3>
              <p className="text-lg font-semibold text-gray-700 mb-3">Fuel Cost Reduction</p>
              <p className="text-gray-600">
                Intelligent route optimization saves up to a third on fuel consumption costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src={Icon}
                  alt="FleetOps Logo"
                  className="h-10 w-10"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold">FleetOps</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                A complete platform for fleet tracking, analytics, and vehicle
                optimization. Control your fleet like never before.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Solutions</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fleet Tracking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Driver Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">EV Monitoring</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fuel Optimization</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Route Planning</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Get the latest news, updates, and fleet management insights.
              </p>
              <form onSubmit={subscribeToNewsletter} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FleetOps by Codera Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}