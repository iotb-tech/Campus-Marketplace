"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "./button";
import { signOut } from "../auth/actions";

interface NavProps {
  userName?: string;
}

const Nav: React.FC<NavProps> = ({ userName = "User" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Brand */}
        <Link className="text-xl sm:text-2xl font-bold text-blue-600" href="/">
          CampusMarket
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 flex-1 mx-8">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-500 flex-1 max-w-xs">
            <span className="material-symbols-outlined text-gray-400 mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
              placeholder="Search items..."
              type="text"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            <Link
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              href="/browse"
            >
              Browse
            </Link>
            <Link
              className="text-gray-600 hover:text-blue-600 transition-colors"
              href="/categories"
            >
              Categories
            </Link>
            <Link
              className="text-gray-600 hover:text-blue-600 transition-colors"
              href="/my-listings"
            >
              My Listings
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Primary CTA */}
          <Button
            variant="primary"
            size="sm"
            className="bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            onClick={() => {
              /* Navigate to post listing */
            }}
          >
            Post Listing
          </Button>

          {/* Inverted / Secondary CTA */}
          <form action={signOut}>
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="bg-transparent border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Log out
            </Button>
          </form>

          {/* Profile Avatar */}
          <button
            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`${userName} profile`}
          >
            <span className="material-symbols-outlined text-[24px]">
              account_circle
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
              <span className="material-symbols-outlined text-gray-400 mr-2">
                search
              </span>
              <input
                className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Search items..."
                type="text"
              />
            </div>

            {/* Mobile Nav Links */}
            <Link
              className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg"
              href="/browse"
            >
              Browse
            </Link>
            <Link
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              href="/categories"
            >
              Categories
            </Link>
            <Link
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              href="/my-listings"
            >
              My Listings
            </Link>

            {/* Mobile Post Listing Button */}
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                /* Navigate to post listing */
              }}
            >
              Post Listing
            </Button>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button className="flex-1 p-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">notifications</span>
                <span className="text-sm">Notifications</span>
              </button>
              <button className="flex-1 p-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="text-sm">Messages</span>
              </button>
            </div>

            {/* Mobile Profile */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined text-[24px]">
                  account_circle
                </span>
              </div>

              <span className="text-gray-800 font-medium">{userName}</span>
            </div>

            {/* Mobile Logout */}
            <form action={signOut} className="pt-2">
              <Button
                type="submit"
                variant="secondary"
                size="md"
                className="w-full"
              >
                Log out
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
