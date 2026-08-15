import { createClient } from "@/app/lib/supabase/server";

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
        <h1 className="text-2xl font-bold">Marketplace</h1>
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

      {listings.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">
            No listings yet
          </h2>

          <p className="text-gray-500 mt-2">
            Be the first to post something.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                {listing.image_url ? (
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">
                    No image
                  </span>
                )}
              </div>

              {/* Category */}
              <p className="text-sm text-blue-600 font-medium capitalize">
                {listing.category.replace("_", " ")}
              </p>

              {/* Title */}
              <h2 className="text-xl font-semibold mt-1">
                {listing.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mt-2 line-clamp-2">
                {listing.description}
              </p>

              {/* Price + Status */}
              <div className="flex items-center justify-between mt-5">
                <p className="text-lg font-bold">
                  ₦{Number(listing.price).toLocaleString()}
                </p>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    listing.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {listing.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}