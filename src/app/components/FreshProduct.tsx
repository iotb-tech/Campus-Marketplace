import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hrs / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export default async function FreshProducts() {
  const supabase = await createClient();

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false })
    .limit(12);

  if (!listings || listings.length === 0) return null;

  return (
    <>
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listings/${listing.id}`}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
            {listing.image_url ? (
              <Image
                src={listing.image_url}
                alt={listing.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-gray-100 to-gray-300">
                <span className="text-sm text-gray-500">No image</span>
              </div>
            )}
          </div>

          {/* Card content */}
          <div className="p-4">
            {/* Title + price */}
            <div className="flex flex-row items-center justify-between px-4 pt-3 gap-3 text-left">
  <strong className="font-bold text-sm text-[#424754]">
    {listing.title}
  </strong>

  <div className="text-sm font-bold whitespace-nowrap">
    ₦{Number(listing.price).toLocaleString()}
  </div>
</div>

            {/* Category */}
            <div className="mt-3">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                {listing.category.replace("_", " ")}
              </span>
            </div>

            {/* Bottom metadata */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-500">
                {timeAgo(listing.created_at)}
              </span>

              <span className="text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                View item →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}