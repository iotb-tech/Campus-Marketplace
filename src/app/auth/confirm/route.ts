<<<<<<< HEAD
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
=======
import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { createClient } from "../../lib/supabase/server";
>>>>>>> 812232df79914acab66a78a019da20d6793fd70c
=======
import { createClient } from "@/app/lib/supabase/server";
>>>>>>> main

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

<<<<<<< HEAD
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
=======
  const code = requestUrl.searchParams.get("code");
>>>>>>> main

  const next = "/dashboard";

  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
<<<<<<< HEAD
      return NextResponse.redirect(redirectTo);
=======
      return NextResponse.redirect(
        new URL("/dashboard", requestUrl.origin)
      );
>>>>>>> main
    }
  }

<<<<<<< HEAD
  redirectTo.pathname = "/auth/error";

  return NextResponse.redirect(redirectTo);
=======
  return NextResponse.redirect(
    new URL("/auth/error", requestUrl.origin)
  );
>>>>>>> main
}