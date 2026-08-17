"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate password confirmation
  if (password !== confirmPassword) {
    redirect(
      `/signup?error=${encodeURIComponent("Passwords do not match.")}`
    );
  }

  // Validate password length
  if (password.length < 6) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Password must be at least 6 characters."
      )}`
    );
  }

  // Create Supabase account
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });

  // Supabase signup error
  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Successful signup
  redirect(
    `/signup?message=${encodeURIComponent(
      "Account created successfully. Check your email to confirm your account."
    )}`
  );
}

// Sign out
export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/signin");
}