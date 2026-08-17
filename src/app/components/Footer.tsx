'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const footerLinks = [
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Safety Guidelines', href: '/safety' },
    { text: 'Support', href: '/support' },
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              CampusMarket
            </Link>

            <p className="mt-1 text-sm text-gray-500">
              Buy, sell and swap with your fellow students.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2026 CampusMarket. All rights reserved. For students, by
            students.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;