'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Leftside from '../components/Leftside';
import { signIn } from '../auth/actions';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login UI feedback
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <main className="flex-row flex items-stretch overflow-hidden">
        {/* Left Side: Visual/Branding */}
        <Leftside />

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container-lowest">
          <div className="w-full max-w-md">
            <nav className="mb-12 flex items-center justify-between">
              <Link
                className="flex items-center gap-2 text-primary font-medium hover:underline"
                href="/"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to site
              </Link>
              <div className="lg:hidden flex items-center gap-2 text-primary">
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold">Academic Exchange</span>
              </div>
            </nav>

            <div className="mb-10">
              <h3 className="text-3xl font-bold text-on-surface mb-2">
                Welcome back, Scholar.
              </h3>
              <p className="text-on-surface-variant">
                Log in with your credentials to continue your sales 
                and collaborations.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" action={signIn}>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                   Email
                </label>
                <div className="relative group">
                  <input
                    className="w-full h-14 bg-surface-container-low border border-outline-variant rounded-xl px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline outline-none"
                    placeholder="email"
                    name="email"
                    type="email"
                    required
                  />
                  
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-on-surface">
                    Password
                  </label>
                  <a
                    className="text-xs text-primary font-bold hover:underline"
                    href="#"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="flex w-full items-stretch rounded-xl border border-outline-variant bg-surface-container-low overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all">
                  <input
                    className="grow h-14 bg-transparent border-0 px-4 focus:ring-0 placeholder:text-outline text-on-surface outline-none"
                    placeholder="••••••••"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 flex items-center justify-center text-outline hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="text-sm text-on-surface-variant cursor-pointer"
                  htmlFor="remember"
                >
                  Keep me signed in for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-14 font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 text-blue hover:bg-blue-400 bg-blue-200 ${
                  isSuccess
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Authenticating...
                  </span>
                ) : isSuccess ? (
                  'Welcome Back!'
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Switch to Sign Up */}
            <p className="mt-6 text-center text-sm text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-primary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* Trust Banner */}
            <div className="mt-10 pt-8 border-t border-outline-variant flex flex-col items-center">
              <p className="text-xs font-bold text-outline uppercase tracking-widest mb-6">
                Secured by University Auth Services
              </p>
              <div className="flex gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-1 font-black text-xl italic">
                  MIT
                </div>
                <div className="flex items-center gap-1 font-black text-xl italic text-red-800">
                  STANFORD
                </div>
                <div className="flex items-center gap-1 font-black text-xl italic text-blue-900">
                  OXFORD
                </div>
              </div>
            </div>

            <footer className="mt-10 text-center">
              <p className="text-sm text-on-surface-variant">
                By signing in, you agree to the{' '}
                <a className="underline font-medium" href="#">
                  Community Guidelines
                </a>{' '}
                and{' '}
                <a className="underline font-medium" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}