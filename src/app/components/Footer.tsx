"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const footerSections = [
  {
    heading: "Marketplace",
    links: [
      { text: "Browse Items", href: "/browse" },
      { text: "Categories", href: "/categories" },
      { text: "Post a Listing", href: "/listings/new" },
    ],
  },
  {
    heading: "Account",
    links: [
      { text: "My Listings", href: "/my-listings" },
      { text: "Profile", href: "/profile" },
      { text: "Dashboard", href: "/dashboard" },
    ],
  },
];

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

            {/* Brand */}
            <div>
              <Link
                href="/"
                className="inline-block text-xl font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                CampusMarket
              </Link>

              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
                Buy, sell and swap with fellow students around your campus.
              </p>
            </div>

            {/* Link sections */}
            {footerSections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-sm font-semibold text-gray-900">
                  {section.heading}
                </h3>

                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
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
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-10 flex flex-col gap-4 border-t border-blue-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500 sm:text-sm">
              © {new Date().getFullYear()} CampusMarket. All rights reserved.
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
