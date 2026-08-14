import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/signin");
  }

  return (
    <main>
      <h1>Campus Marketplace Dashboard</h1>
      <p>You are signed in.</p>
    </main>
  );
}