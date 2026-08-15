"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

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

<<<<<<< HEAD
=======
  const name = formData.get("name") as string;
>>>>>>> main
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
<<<<<<< HEAD
=======
      data: {
        name,
      },
>>>>>>> main
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });

  if (error) {
<<<<<<< HEAD
    redirect(`/sign-up?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/sign-up?message=Check%20your%20email%20to%20confirm%20your%20account");
=======
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    "/signup?message=Check%20your%20email%20to%20confirm%20your%20account"
  );
>>>>>>> main
}