"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/app/lib/supabase/client";
import { uploadImageToCloudinary } from "@/app/lib/cloudinary";

import {
  listingSchema,
  type ListingFormData,
} from "../../lib/validations/listing";
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

export default function NewListingPage() {
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
      image_file: "",
    },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToCloudinary(file).then(setImageUrl);
    }
  };

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

    const image_url = imageUrl || data.image_url || null;

    const { error } = await supabase.from("listings").insert({
      user_id: user.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      image_url: image_url,
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
    <> 
    <Nav />
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

        {/* Image */}
        <div>
          <label
            htmlFor="image_file"
            className="block font-medium mb-2"
          >
            Image
          </label>

          <input
            type="file"
            id="image_file"
            accept="image/*"
            {...register("image_file", { valueAsNumber: false })}
            onChange={onFileChange}
            className="w-full border rounded-lg p-3 hidden"
            ref={fileRef}
          />

          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  fileRef.current?.click();
                }}
                className="mt-2 text-blue-600 underline"
              >
                Change image
              </button>
            </div>
          )}

          {errors.image_file && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image_file.message}
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
    <Footer />
    </>
  );
}