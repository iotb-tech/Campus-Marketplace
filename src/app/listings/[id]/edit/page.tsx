"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/app/lib/supabase/client";
import ImageUploader from "@/app/components/ImageUploader";

import {
  listingSchema,
  type ListingFormData,
} from "@/app/lib/validations/listing";

import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "books", label: "Books" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "school_supplies", label: "School Supplies" },
  { value: "vehicles_rides", label: "Vehicles & Rides" },
  { value: "other", label: "Other" },
] as const;

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "other",
      image_url: "",
    },
  });

  useEffect(() => {
    async function loadListing() {
      setLoading(true);
      setErrorMessage(null);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      // Get listing
      const { data: listing, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !listing) {
        setErrorMessage("Listing not found.");
        setLoading(false);
        return;
      }

      // Make sure this user owns the listing
      if (listing.user_id !== user.id) {
        setErrorMessage(
          "You are not allowed to edit this listing."
        );
        setLoading(false);
        return;
      }

      // Fill the form with existing listing data
      reset({
        title: listing.title,
        description: listing.description,
        price: Number(listing.price),
        category: listing.category,
        image_url: listing.image_url || "",
      });

      // If there's an existing image URL, load it
      setImageUrl(listing.image_url || null);

      setLoading(false);
    }

    loadListing();
  }, [id, reset, router]);

  async function onSubmit(data: ListingFormData) {
    setErrorMessage(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/signin");
      return;
    }

    const { error } = await supabase
      .from("listings")
      .update({
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image_url: imageUrl || data.image_url || null,
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("UPDATE LISTING ERROR:", error);
      setErrorMessage(error.message);
      return;
    }

    router.push(`/listings/${id}`);
    router.refresh();
  }

  if (loading) {
    return (
      <>
        <Nav />

        <main className="max-w-2xl mx-auto p-6">
          <p>Loading listing...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <Nav />

        <main className="max-w-2xl mx-auto p-6">
          <p className="text-red-500">
            {errorMessage}
          </p>

          <button
            onClick={() => router.push(`/listings/${id}`)}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to listing
          </button>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />

      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">
          Edit Listing
        </h1>

        <p className="text-gray-600 mb-8">
          Update the information about your listing.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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

          {/* Image */}
          <ImageUploader value={imageUrl} onChange={setImageUrl} label="Product Photo" />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/listings/${id}`)}
              className="flex-1 border border-gray-300 py-3 rounded-lg font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}