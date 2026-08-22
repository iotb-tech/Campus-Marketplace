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
    .limit(6);

  if (!listings || listings.length === 0) return null;

  return (
    <>
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listings/${listing.id}`}
          className="flex flex-col border rounded-lg border-gray-300 hover:shadow-md transition-shadow"
        >
          <div className="relative h-48">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            {listing.image_url ? (
              <Image
                src={listing.image_url}
                alt={listing.title}
                fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-md">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="flex flex-row px-4 gap-6 justify-between pt-3">
            <strong className="font-bold text-sm text-[#424754]">
              {listing.title}
            </strong>
            <div className="text-2xl font-bold">
              ₦{Number(listing.price).toLocaleString()}
            </div>
          </div>

          <div className="flex flex-col px-4 gap-2 pb-4 pt-2">
            <p className="font-normal text-md text-[#424754] capitalize">
              {listing.category.replace("_", " ")}
            </p>
            <hr />
            <p className="font-normal text-md text-[#424754]">
              {timeAgo(listing.created_at)}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}