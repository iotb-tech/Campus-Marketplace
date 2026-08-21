'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Button from './button';
import { signOut } from '../auth/actions';

interface NavProps {
  userName?: string;
}

const Nav: React.FC<NavProps> = ({ userName = 'User' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Brand */}
        <Link className="text-lg sm:text-2xl font-bold text-blue-600 shrink-0" href="/">
          CampusMarket
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 mx-6 lg:mx-8">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-500 flex-1 max-w-xs">
            <span className="material-symbols-outlined text-gray-400 mr-2 text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
              placeholder="Search items..."
              type="text"
            />
          </div>

          <nav className="flex items-center gap-5 lg:gap-6">
            <Link className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm" href="/browse">
              Browse
            </Link>
            <Link className="text-gray-600 hover:text-blue-600 transition-colors text-sm" href="/categories">
              Categories
            </Link>
            <Link className="text-gray-600 hover:text-blue-600 transition-colors text-sm" href="/my-listings">
              My Listings
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/listings/new">
            <Button variant="primary" size="sm">Post Listing</Button>
          </Link>

          <form action={signOut}>
            <Button type="submit" variant="secondary" size="sm">Log out</Button>
          </form>
        </div>

        {/* Mobile Right Actions */}
        <div className="flex md:hidden items-center gap-1">
          <Link
            href="/profile"
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </Link>

          <button
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2.5 border border-gray-200 mb-3">
            <span className="material-symbols-outlined text-gray-400 mr-2 text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
              placeholder="Search items..."
              type="text"
            />
          </div>

          {/* Mobile Nav Links */}
          <Link
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            href="/browse"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">explore</span>
            Browse
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            href="/categories"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">category</span>
            Categories
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            href="/my-listings"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">inventory_2</span>
            My Listings
          </Link>

          <div className="border-t border-gray-100 my-2" />

          <Link
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            href="/profile"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">person</span>
            Profile
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            href="/listings/new"
            onClick={closeMenu}
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">add_circle</span>
            Post Listing
          </Link>

          <div className="border-t border-gray-100 my-2" />

          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{userName}</span>
          </div>

          <form action={signOut}>
            <Button type="submit" variant="secondary" size="md" className="w-full mt-1">
              Log out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Nav;
