"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/app/lib/supabase/client";

import {
  listingSchema,
  type ListingFormData,
} from "../../lib/validations/listing";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "books", label: "Books" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "school_supplies", label: "School Supplies" },
  { value: "vehicles_rides", label: "Vehicles & Rides" },
  { value: "other", label: "Other" },
] as const;

export default function NewListingPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      category: "other",
      image_url: "",
    },
  });

  async function onSubmit(data: ListingFormData) {
  setSuccess(false);

  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("You must be signed in to create a listing.");
    return;
  }

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    title: data.title,
    description: data.description,
    price: data.price,
    category: data.category,
    image_url: data.image_url || null,
    status: "available",
  });

  if (error) {
    console.error("LISTING ERROR:", error);
    alert(error.message);
    return;
  }

  setSuccess(true);
}

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        Create Listing
      </h1>

      <p className="text-gray-600 mb-8">
        Sell or swap an item with your fellow students.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block font-medium mb-2"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="e.g. Scientific Calculator"
            {...register("title")}
            className="w-full border rounded-lg p-3"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium mb-2"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Describe the item..."
            {...register("description")}
            className="w-full border rounded-lg p-3"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block font-medium mb-2"
          >
            Price (₦)
          </label>

          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="15000"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block font-medium mb-2"
          >
            Category
          </label>

          <select
            id="category"
            {...register("category")}
            className="w-full border rounded-lg p-3"
          >
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.label}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image_url"
            className="block font-medium mb-2"
          >
            Image URL
            <span className="text-gray-500 font-normal">
              {" "}(optional for now)
            </span>
          </label>

          <input
            id="image_url"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("image_url")}
            className="w-full border rounded-lg p-3"
          />

          {errors.image_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image_url.message}
            </p>
          )}
        </div>

        {/* Success */}
        {success && (
          <p className="text-green-600">
            Listing form validated successfully!
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </main>
  );
}