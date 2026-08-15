"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp(formData: FormData) {
    setError(null);
    setMessage(null);
    setIsLoading(true);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check that both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Check minimum password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setMessage("Check your email to confirm your account.");
    setIsLoading(false);
  }

  return (
    <main>
      <h1>Create account</h1>

      <form action={handleSignUp}>
        {/* Full Name */}
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full name"
          required
        />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="mb-4 text-2xl text-black"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          minLength={6}
          required
        />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          minLength={6}
          required
        />

        {/* Submit */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {message && (
        <p className="text-green-600">
          {message}
        </p>
      )}
    </main>
  );
}