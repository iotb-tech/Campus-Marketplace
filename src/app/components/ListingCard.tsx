import Image from "next/image";
import Link from "next/link";

export const CATEGORY_ICONS: Record<string, string> = {
  electronics: "devices",
  books: "menu_book",
  furniture: "chair",
  clothing: "checkroom",
  school_supplies: "edit_note",
  vehicles_rides: "directions_car",
  other: "category",
};

export function formatTimeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

interface ListingCardListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  status: string;
  created_at?: string | null;
  profiles?: { name?: string } | null;
}

const ListingCard = ({ listing }: { listing: ListingCardListing }) => {
  const icon = CATEGORY_ICONS[listing.category] ?? "category";

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
        {listing.image_url ? (
          <Image
            src={listing.image_url}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[52px] text-blue-300">
              {icon}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-blue-300">
              No photo yet
            </span>
          </div>
        )}

        {listing.status !== "available" && (
          <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {listing.status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex grow flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-blue-700">
            <span className="material-symbols-outlined text-[13px]">{icon}</span>
            {listing.category.replace("_", " ")}
          </span>
        </div>

        <h3 className="mt-2.5 line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg">
          {listing.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
          {listing.description}
        </p>

        {/* Seller meta */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
          <span className="material-symbols-outlined text-[15px]">person</span>
          <span className="max-w-[10rem] truncate">
            {listing.profiles?.name || "Student seller"}
          </span>
          {listing.created_at && (
            <>
              <span aria-hidden>·</span>
              <span>{formatTimeAgo(listing.created_at)}</span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3.5">
          <p className="text-xl font-bold tracking-tight text-gray-900">
            ₦{Number(listing.price).toLocaleString()}
          </p>
          <span className="inline-flex items-center gap-0.5 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
