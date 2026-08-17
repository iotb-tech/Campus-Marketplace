import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

type ListingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailsPage({
  params,
}: ListingDetailsPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Get the currently signed-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the listing and seller profile
  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      profiles (
        name,
        avatar_url
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !listing) {
    notFound();
  }

  // Check whether the current user owns this listing
  const isOwner = user?.id === listing.user_id;

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Back button */}
      <Link
        href="/listings"
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← Back to listings
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="h-100 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">
              No image available
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-blue-600 font-medium capitalize">
              {listing.category.replace("_", " ")}
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

          <h1 className="text-3xl font-bold mt-3">
            {listing.title}
          </h1>

          <p className="text-2xl font-bold mt-5">
            ₦{Number(listing.price).toLocaleString()}
          </p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">
              Description
            </h2>

            <p className="text-gray-600 mt-2 whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Listing status
            </p>

            <p className="font-medium capitalize mt-1">
              {listing.status}
            </p>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="mt-8 flex gap-3">
              <Link
                href={`/listings/${listing.id}/edit`}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Edit Listing
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Seller */}
      <div className="mt-8 pt-6 border-t">
        <h2 className="text-lg font-semibold mb-4">
          Seller
        </h2>

        <div className="flex items-center gap-3">
          {listing.profiles?.avatar_url ? (
            <img
              src={listing.profiles.avatar_url}
              alt={listing.profiles.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-semibold">
                {listing.profiles?.name
                  ?.charAt(0)
                  .toUpperCase() || "?"}
              </span>
            </div>
          )}

          <div>
            <p className="font-medium">
              {listing.profiles?.name || "Unknown seller"}
            </p>

            <p className="text-sm text-gray-500">
              Marketplace seller
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}