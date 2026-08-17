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
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="material-symbols-outlined text-blue-600 text-3xl">
                {meta.icon}
              </span>
              <h2 className="text-xl font-semibold mt-3">{meta.label}</h2>
              <p className="text-gray-500 mt-1">{meta.description}</p>
              <p className="text-sm text-blue-600 font-medium mt-4">
                {counts[key] || 0} item{counts[key] !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
