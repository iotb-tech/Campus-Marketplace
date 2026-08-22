import { createClient } from "@/app/lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function BrowsePage() {
  const supabase = await createClient();

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
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
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                  {listing.image_url ? (
                    <Image
                      src={listing.image_url}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {listing.description}
                </p>
                <p className="text-lg font-bold mt-4">
                  ₦{Number(listing.price).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No items available
            </h2>
            <p className="text-gray-500 mt-2">
              Check back later or post your own listing!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
