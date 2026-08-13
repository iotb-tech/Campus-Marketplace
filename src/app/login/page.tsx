'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
      <main className="flex-grow flex items-stretch overflow-hidden">
        {/* Left Side: Visual/Branding (Visible on large screens) */}
        <div className="hidden lg:flex w-1/2 relative bg-primary-container overflow-hidden items-center justify-center">
          <div className="relative z-10 px-20 text-white max-w-2xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2 bg-surface-container-lowest rounded-xl">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                Academic Exchange
              </h1>
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight">
              Elevate your campus journey.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed font-light mb-10">
              A secure space built exclusively for scholars. Join thousands of
              your peers in sharing insights, resources, and innovation within
              a trusted community.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <span className="material-symbols-outlined text-4xl mb-3">
                  verified_user
                </span>
                <h4 className="font-bold text-lg mb-1">Campus Verified</h4>
                <p className="text-sm opacity-80">
                  Access restricted to verified university emails only.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <span className="material-symbols-outlined text-4xl mb-3">
                  groups
                </span>
                <h4 className="font-bold text-lg mb-1">Collaborative</h4>
                <p className="text-sm opacity-80">
                  Sync with study groups and department projects instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Image Accent */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] opacity-20">
            <img
              className="w-full h-full object-cover rounded-full"
              alt="University architecture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqbYg5VGtA-bVIB4NhYf4yZDGFJbWBlp8Ag48OQ3tiwuK4zEVeoBzTTxGAHIFQ7I_BdgtVvLG7SFqnbXWIvTg4tQjoJH9ej_QJfAkxVOyV0SzAG8TxV-HeQHYWS0bhx2y074uioFEW9eCrlhroTg6fL5ABL-84SQDoPQQPgERSLDPLWJZrDUp_Iq10ZCIJsno25yJ_IQvBKYUKNeqX-unVvn4nzwNqihYNczXHGZJgeGNO-xRmXA"
            />
          </div>
        </div>

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
                Log in with your academic credentials to continue your research
                and collaborations.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Campus Email
                </label>
                <div className="relative group">
                  <input
                    className="w-full h-14 bg-surface-container-low border border-outline-variant rounded-xl px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline outline-none"
                    placeholder="student@university.edu"
                    type="email"
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">
                    alternate_email
                  </span>
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
                    className="flex-grow h-14 bg-transparent border-0 px-4 focus:ring-0 placeholder:text-outline text-on-surface outline-none"
                    placeholder="••••••••"
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
                className={`w-full h-14 font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 text-white ${
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
              Don't have an account?{' '}
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