import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DashboardStats from "../components/DashboardStats";
import MarkSoldButton from "../components/MarkSoldButton";
import Link from "next/link";
import Image from "next/image";

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

            <h2 className="text-xl font-semibold mb-4">My Active Listings</h2>
            {active.length === 0 ? (
              <p className="text-gray-500 mb-10">No active listings yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                {active.map((listing) => (
                  <div key={listing.id} className="border rounded-xl p-5 bg-white shadow-sm">
                    <div className="h-40 rounded-lg bg-gray-100 mb-4 overflow-hidden">
                      {listing.image_url && (
                        <Image
                          src={listing.image_url}
                          alt={listing.title}
                          width={300}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-blue-600 font-bold">
                      ₦{Number(listing.price).toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/listings/${listing.id}/edit`}
                        className="px-3 py-1.5 border rounded-lg text-sm"
                      >
                        Edit
                      </Link>
                      <MarkSoldButton listingId={listing.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
            {sold.length === 0 ? (
              <p className="text-gray-500">No sold items yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sold.map((listing) => (
                  <div
                    key={listing.id}
                    className="border rounded-xl p-5 bg-white shadow-sm opacity-60"
                  >
                    <div className="h-40 rounded-lg bg-gray-100 mb-4 overflow-hidden grayscale">
                      {listing.image_url && (
                        <Image
                          src={listing.image_url}
                          alt={listing.title}
                          width={300}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-gray-500 font-bold">
                      ₦{Number(listing.price).toLocaleString()}
                    </p>
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