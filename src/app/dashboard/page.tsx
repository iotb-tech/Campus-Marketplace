import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DashboardStats from "../components/DashboardStats";
import MarkSoldButton from "../components/MarkSoldButton";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/signin");
  }

  const userId = data.claims.sub;

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const active = listings?.filter((l) => l.status === "available") ?? [];
  const sold = listings?.filter((l) => l.status === "sold") ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your listings, track sales, and update items.
            </p>
          </div>
          <Link
            href="/listings/new"
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            + Create New Post
          </Link>
        </div>

        {error ? (
          <p className="text-red-500">Unable to load your listings.</p>
        ) : (
          <>
            <DashboardStats listings={listings ?? []} />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Active Listings</h2>
              <Link href="/my-listings" className="text-blue-600 text-sm font-medium">
                View all →
              </Link>
            </div>
            {active.length === 0 ? (
              <p className="text-gray-500 mb-10">No active listings yet.</p>
            ) : (
              <div className="flex flex-col gap-4 mb-10">
                {active.map((listing) => (
                  <div
                    key={listing.id}
                    className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {listing.image_url && (
                        <Image
                          src={listing.image_url}
                          alt={listing.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p className="text-blue-600 font-bold">
                        ₦{Number(listing.price).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Posted on {formatDate(listing.created_at)}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link
                        href={`/listings/${listing.id}/edit`}
                        className="px-4 py-2 border rounded-lg text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <MarkSoldButton listingId={listing.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sold Items</h2>
              <Link href="/my-listings" className="text-blue-600 text-sm font-medium">
                View all →
              </Link>
            </div>
            {sold.length === 0 ? (
              <p className="text-gray-500">No sold items yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {sold.map((listing) => (
                  <div
                    key={listing.id}
                    className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 grayscale">
                      {listing.image_url && (
                        <Image
                          src={listing.image_url}
                          alt={listing.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold text-gray-500">{listing.title}</h3>
                      <p className="text-gray-500 font-bold line-through">
                        ₦{Number(listing.price).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Sold on {formatDate(listing.created_at)}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                          ✓ Sold
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}