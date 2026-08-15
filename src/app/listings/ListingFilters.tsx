"use client";

import { useMemo, useState } from "react";

type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  status: string;
};

type ListingFiltersProps = {
  listings: Listing[];
};

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "books", label: "Books" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "school_supplies", label: "School Supplies" },
  { value: "vehicles_rides", label: "Vehicles & Rides" },
  { value: "other", label: "Other" },
];

export default function ListingFilters({
  listings,
}: ListingFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "all" || listing.category === category;

      const matchesMinPrice =
        !minPrice || listing.price >= Number(minPrice);

      const matchesMaxPrice =
        !maxPrice || listing.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [listings, search, category, minPrice, maxPrice]);

  return (
    <div>
      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {/* Search */}
        <input
          type="search"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3"
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Minimum price */}
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg p-3"
        />

        {/* Maximum price */}
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg p-3"
        />
      </div>

      {/* Results */}
      {filteredListings.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">
            No listings found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <article
              key={listing.id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
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

              <p className="text-sm text-blue-600 font-medium capitalize">
                {listing.category.replace("_", " ")}
              </p>

              <h2 className="text-xl font-semibold mt-1">
                {listing.title}
              </h2>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {listing.description}
              </p>

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
    </div>
  );
}