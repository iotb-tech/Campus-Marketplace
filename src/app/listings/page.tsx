import { createClient } from "@/app/lib/supabase/server";
import ListingFilters from "./ListingFilters";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default async function ListingsPage() {
  const supabase = await createClient();


  const { data: listings, error } = await supabase
    .from("listings")
    .select("*, profiles(name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching listings:", error.message);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Nav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="mt-4 text-red-500">
            Unable to load listings. Please try again later.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // Render successfully loaded listings page
  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">
            Find items being sold by your fellow students.
          </p>
        </div>

        <ListingFilters listings={listings ?? []} />
      </main>
      <Footer />
    </div>
    </>
  );
}
