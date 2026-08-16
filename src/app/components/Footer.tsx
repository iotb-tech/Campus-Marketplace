'use client';

import React from 'react';

const Footer: React.FC = () => {
  const footerLinks = [
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Safety Guidelines', href: '/safety' },
    { text: 'Support', href: '/support' },
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row md:px-6 lg:px-8">
        <div className="font-semibold text-gray-900">CampusMarket</div>

        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="transition-colors hover:text-gray-900 hover:underline"
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          © 2026 CampusMarket. All rights reserved. For students, by students.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
