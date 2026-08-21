"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const footerLinks = [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Safety Guidelines", href: "/safety" },
    { text: "Support", href: "/support" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="w-full border-t border-blue-100 bg-blue-50/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* Main Footer */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-block text-xl font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                CampusMarket
              </Link>

              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
                Buy, sell and swap with fellow students around your campus.
              </p>

              <p className="mt-4 text-sm font-medium text-gray-500">
                For students, by students.
              </p>
            </div>

            {/* Marketplace */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Marketplace
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/marketplace"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Browse Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/sell"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Sell an Item
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-listings"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    My Listings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Community
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    How It Works
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    About CampusMarket
                  </Link>
                </li>

                <li>
                  <Link
                    href="/safety"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Safety Guidelines
                  </Link>
                </li>

                <li>
                  <Link
                    href="/support"
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Legal
              </h3>

              <ul className="mt-4 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 flex flex-col gap-4 border-t border-blue-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500 sm:text-sm">
              © 2026 CampusMarket. All rights reserved.
            </p>

            <p className="text-xs text-gray-400 sm:text-sm">
              Built for students, by students.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          <ArrowUp size={17} />
          <span className="hidden sm:inline">Back to top</span>
        </button>
      )}
    </>
  );
};

export default Footer;