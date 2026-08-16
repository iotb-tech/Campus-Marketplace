import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/signin");
  }

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-3xl font-bold">Campus Marketplace Dashboard</h1>
        <p className="text-gray-600">You are signed in.</p>
      </main>
      <Footer />
    </>
  );
}