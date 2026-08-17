"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { signUp } from "@/app/auth/actions";

export default function SignUpPage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-blue-600"
          >
            CampusMarket
          </Link>

          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Already have an account?{" "}
            <span className="text-blue-600 font-semibold">
              Sign in
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-3xl">
                person_add
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-3 text-gray-600">
              Join CampusMarket and start buying or selling with your fellow
              students.
            </p>
          </div>

          {/* Signup Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-sm text-green-700">
                  {message}
                </p>
              </div>
            )}

            <form action={signUp} className="space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    minLength={6}
                    required
                    className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 pr-12 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span className="material-symbols-outlined">
                      {showPassword
                        ? "visibility_off"
                        : "visibility"}
                    </span>
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    minLength={6}
                    required
                    className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 pr-12 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword
                        ? "visibility_off"
                        : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Account
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-5 text-center text-xs text-gray-500 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-gray-800"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:text-gray-800"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}