import { createClient } from "@/app/lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import EmptyState from "../components/EmptyState";
import Link from "next/link";

export default async function BrowsePage() {
  const supabase = await createClient();

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*, profiles(name)")
    .eq("status", "available")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
          <p className="text-gray-600 mt-2">
            Explore everything available on campus.
          </p>
        </div>

        {error ? (
          <p className="text-red-500">
            Unable to load listings. Please try again later.
          </p>
        ) : listings && listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="storefront"
            title="No items available yet"
            description="Check back later, or be the first to post something for your campus."
            action={
              <Link
                href="/listings/new"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Post an Item
              </Link>
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
