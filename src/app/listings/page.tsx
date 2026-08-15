import { createClient } from "@/app/lib/supabase/server";
import ListingFilters from "./ListingFilters";

export default async function ListingsPage() {
  const supabase = await createClient();

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("LISTINGS ERROR:", error.message);

    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Marketplace
        </h1>

        <p className="mt-4 text-red-500">
          Unable to load listings.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Marketplace
        </h1>

        <p className="text-gray-600 mt-2">
          Find items being sold by your fellow students.
        </p>
      </div>

      <ListingFilters listings={listings ?? []} />
    </main>
  );
}