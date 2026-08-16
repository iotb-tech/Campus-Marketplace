import { createClient } from "@/app/lib/supabase/server";
import ListingFilters  from "./ListingFilters"

export default async function BrowsePage() {
  const supabase = await createClient();

  // Fetch all listings from your Supabase table
  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching listings:", error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Pass the fetched Supabase data into your interactive Client Component */}
        <ListingFilters listings={listings || []} />
      </div>
    </div>
  );
}