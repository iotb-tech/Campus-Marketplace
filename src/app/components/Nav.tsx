'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './button';
import { signOut } from '../auth/actions';
import { createClient } from '../lib/supabase/client';

interface NavProps {
  userName?: string;
}

const navItems = [
  { href: '/browse', label: 'Browse', icon: 'explore' },
  { href: '/categories', label: 'Categories', icon: 'category' },
  { href: '/my-listings', label: 'My Listings', icon: 'inventory_2' },
];

const ProfileAvatar = ({ avatarUrl, size }: { avatarUrl: string | null; size: string }) =>
  avatarUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarUrl}
      alt="Profile"
      className={`${size} rounded-full object-cover ring-2 ring-blue-100`}
    />
  ) : (
    <span className={`material-symbols-outlined text-gray-400 ${size}`}>account_circle</span>
  );

const Nav: React.FC<NavProps> = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;

      if (!user) return;
      setIsLoggedIn(true);

      const nameFromEmail = user.email?.split('@')[0] ?? 'User';
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url, name')
        .eq('id', user.id)
        .single();

      if (cancelled) return;
      setAvatarUrl(profile?.avatar_url ?? null);
      setUserName(profile?.name || nameFromEmail);
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`relative py-1.5 transition-colors text-sm ${
                  isActive(item.href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600 transition-all duration-200 ${
                    isActive(item.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="p-1 rounded-full hover:ring-2 hover:ring-blue-200 transition-all"
                aria-label="Profile"
                title={userName}
              >
                <ProfileAvatar avatarUrl={avatarUrl} size="w-8 h-8 text-[28px]" />
              </Link>

              <form action={signOut}>
                <Button type="submit" variant="secondary" size="sm">Log out</Button>
              </form>
            </>
          ) : (
            <Link
              href="/signin"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Right Actions */}
        <div className="flex md:hidden items-center gap-1">
          {isLoggedIn && (
            <Link href="/profile" className="p-1 rounded-full transition-all" aria-label="Profile">
              <ProfileAvatar avatarUrl={avatarUrl} size="w-8 h-8 text-[28px]" />
            </Link>
          )}

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isActive(item.href) ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 my-2" />

          {isLoggedIn ? (
            <>
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
                <ProfileAvatar avatarUrl={avatarUrl} size="w-8 h-8 text-[28px]" />
                <span className="text-sm font-medium text-gray-800">{userName}</span>
              </div>

              <form action={signOut}>
                <Button type="submit" variant="secondary" size="md" className="w-full mt-1">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={closeMenu}
              className="block w-full bg-blue-600 text-white text-sm font-medium text-center px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-1"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
