"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignUp(formData: FormData) {
    setError(null);
    setMessage(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Check your email to confirm your account.");
  }

  return (
    <main>
      <h1>Create account</h1>

      <form action={handleSignUp}>
        <input
          className="mb-4 text-2xl text-black"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          minLength={6}
          required
        />

        <button type="submit">
          Create Account
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