"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type Listing = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image_url: string | null;
    status: string;
    created_at: string | null;
};

type ListingFiltersProps = {
  listings: Listing[];
};

const categories = [
    { value: "books", label: "TextBooks" },
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "school_supplies", label: "Supplies" },
    { value: "vehicles_rides", label: "Vehicles & Rides" },
    { value: "other", label: "Other" }
];

type SortOption = "newest" | "oldest" | "price_asc" | "price_desc";

export default function ListingPage({ listings }: ListingFiltersProps) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [status, setStatus] = useState<"available" | "sold">("available");
    const [sortBy, setSortBy] = useState<SortOption>("newest");

  {
    /* Toggle the categories checkboxes*/
  }

  function handleCategoryChange(categoryValue: string) {
    setCategory((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((c) => c !== categoryValue)
        : [...prev, categoryValue],
    );
  }

    const filteredListings = useMemo(() => {
        const filtered = listings.filter((listing) => {
            const matchesSearch =
                !search ||
                listing.title.toLowerCase().includes(search.toLowerCase()) ||
                listing.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                category.length === 0 ||
                category.includes(listing.category);

      const matchesMinPrice = !minPrice || listing.price >= Number(minPrice);

            const matchesMaxPrice =
                !maxPrice || listing.price <= Number(maxPrice);
            
            const matchesStatus = listing.status === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesStatus
            );
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === "price_asc") return a.price - b.price;
            if (sortBy === "price_desc") return b.price - a.price;

            const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;

            if (sortBy === "oldest") return timeA - timeB;

            {/* Default which is the newest*/}
            return timeB - timeA;
        });
    }, [listings, search, category, minPrice, maxPrice, status, sortBy]);

    return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* FILTER SIDEBAR */}
      <aside className="w-full md:w-64 p-6 bg-white border border-gray-300 rounded-2xl shadow-sm text-gray-800 font-sans shrink-0 h-fit">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Filters</h2>

        {/* Categories Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-3">
            Categories
          </h3>
          <div className="flex flex-col gap-2">
            {categories.map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-3 cursor-pointer text-base font-medium"
              >
                <input
                  type="checkbox"
                  checked={category.includes(item.value)}
                  onChange={() => handleCategoryChange(item.value)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                {item.label}
              </label>
            ))}
          </div>
        </section>

        {/* Price Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-3">
            Price
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500"
            />
            <span className="text-gray-400 font-medium">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
        </section>
                {/*Status Section*/}
                <section className="mb-6">
                    <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-3">
                        Availability
                    </h3>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 cursor-pointer text-base font-medium text-gray-800">
                            <input
                                type="radio"
                                name="statusFilter"
                                value="available"
                                checked={status === "available"}
                                onChange={() => setStatus("available")}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            Available Only
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer text-base font-medium text-gray-800">
                            <input
                                type="radio"
                                name="statusFilter"
                                value="sold"
                                checked={status === "sold"}
                                onChange={() => setStatus("sold")}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            Sold Items
                        </label>
                    </div>
                </section>
      </aside>

      {/* RESULTS DISPLAY */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-base font-medium text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{filteredListings.length}</span> of{" "}
                        <span className="font-semibold text-gray-900">{listings.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-base font-medium text-gray-600 shrink-0">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-base text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

              
                {/*Search input bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search listings by title or description......"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {/* Listings Grid */}
                {filteredListings.length === 0 ? (
                    <div className="py-20 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">No listings found</h2>
                        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredListings.map((listing) => (
                            <article key={listing.id} className="border rounded-xl p-5 bg-white shadow-sm">
                                <div className="h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                                    {listing.image_url ? (
                                        <Image src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">No image</span>
                                    )}
                                </div>
                                <p className="text-sm text-blue-600 font-medium capitalize">
                                    {listing.category.replace("_", " ")}
                                </p>
                                <h2 className="text-xl font-semibold mt-1">{listing.title}</h2>
                                <p className="text-gray-600 mt-2 line-clamp-2">{listing.description}</p>
                                <div className="flex items-center justify-between mt-5">
                                    <p className="text-lg font-bold">₦{Number(listing.price).toLocaleString()}</p>
                                    <span className={`text-sm px-3 py-1 rounded-full ${listing.status === "available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {listing.status}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
