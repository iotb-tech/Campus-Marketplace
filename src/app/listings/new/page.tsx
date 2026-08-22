"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/app/lib/supabase/client";
import ImageUploader from "@/app/components/ImageUploader";
import { Input, Textarea, Select } from "@/app/components/FormFields";
import InlineAlert from "@/app/components/InlineAlert";
import Button from "@/app/components/button";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    setErrorMessage(null);

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be signed in to create a listing.");
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
      setErrorMessage(error.message);
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

        <p className="text-sm text-neutral-600 mb-8">
          Sell or swap an item with your fellow students.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <Input
            id="title"
            label="Title"
            type="text"
            placeholder="e.g. Scientific Calculator"
            error={errors.title?.message}
            {...register("title")}
          />

          <Textarea
            id="description"
            label="Description"
            rows={5}
            placeholder="Describe the item..."
            error={errors.description?.message}
            {...register("description")}
          />

          <Input
            id="price"
            label="Price (₦)"
            type="number"
            min="0"
            step="0.01"
            placeholder="15000"
            error={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
          />

          <Select
            id="category"
            label="Category"
            error={errors.category?.message}
            {...register("category")}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>

          <ImageUploader value={imageUrl} onChange={setImageUrl} label="Product Photo" />

          {errorMessage && (
            <InlineAlert variant="error" title="Couldn't create listing" onDismiss={() => setErrorMessage(null)}>
              {errorMessage}
            </InlineAlert>
          )}

          {success && (
            <InlineAlert variant="success" title="Listing created!">
              Your listing is now live on the marketplace.
            </InlineAlert>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full py-3"
            size="lg"
          >
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </form>

      </main>
      <Footer />
    </>
  );
}
