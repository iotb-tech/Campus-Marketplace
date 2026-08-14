import { redirect } from "next/navigation";
<<<<<<< HEAD
import { createClient } from "@/app/lib/supabase/server";
=======
import { createClient } from "../lib/supabase/server";
>>>>>>> 812232df79914acab66a78a019da20d6793fd70c

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>Campus Marketplace Dashboard</h1>
      <p>You are signed in.</p>
    </main>
  );
}