import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function MyListingsPage() {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getClaims();

  if (!authData?.claims) {
    redirect("/signin");
  }

  const userId = authData.claims.sub;

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-2">
              Manage the items you have posted.
            </p>
          </div>
          <Link
            href="/listings/new"
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Post New Listing
          </Link>
        </div>

        {error ? (
          <p className="text-red-500">
            Unable to load your listings. Please try again later.
          </p>
        ) : listings && listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                  {listing.image_url ? (
                    <Image
                      src={listing.image_url}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                <p className="text-sm text-blue-600 font-medium capitalize">
                  {listing.category.replace("_", " ")}
                </p>
                <h2 className="text-xl font-semibold mt-1">{listing.title}</h2>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold">
                    ₦{Number(listing.price).toLocaleString()}
                  </p>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${listing.status === "available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                  >
                    {listing.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No listings yet
            </h2>
            <p className="text-gray-500 mt-2">
              You haven&apos;t posted anything. Start selling!
            </p>
            <Link
              href="/listings/new"
              className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Post Your First Listing
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
