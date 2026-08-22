import { createClient } from "@/app/lib/supabase/server";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

const categoryMeta: Record<string, { label: string; icon: string; description: string }> = {
  electronics: { label: "Electronics", icon: "devices", description: "Laptops, phones, gadgets and more" },
  books: { label: "Textbooks", icon: "menu_book", description: "Course materials and reading books" },
  furniture: { label: "Furniture", icon: "chair", description: "Desks, chairs, beds and other furniture" },
  clothing: { label: "Clothing", icon: "checkroom", description: "Apparel, shoes and accessories" },
  school_supplies: { label: "School Supplies", icon: "edit_note", description: "Stationery, bags and essentials" },
  vehicles_rides: { label: "Vehicles & Rides", icon: "directions_car", description: "Cars, bikes and ride shares" },
  other: { label: "Other", icon: "category", description: "Everything else" },
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("listings")
    .select("category")
    .eq("status", "available");

  const counts: Record<string, number> = {};
  data?.forEach((row) => {
    counts[row.category] = (counts[row.category] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Browse by category.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryMeta).map(([key, meta]) => (
            <Link
              key={key}
              href={`/listings?category=${key}`}
              className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <span className="material-symbols-outlined text-[24px]">
                    {meta.icon}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  {meta.label}
                </h2>
              </div>

              <p className="mt-3 line-clamp-2 grow text-sm leading-5 text-gray-500">
                {meta.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3.5">
                <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600">
                  {counts[key] || 0} {counts[key] === 1 ? "item" : "items"}
                </span>
                <span className="material-symbols-outlined text-[18px] text-gray-300 transition-colors group-hover:text-blue-500">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
