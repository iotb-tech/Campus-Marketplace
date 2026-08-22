import { z } from "zod";

export const listingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),

  price: z
    .number({
      message: "Price is required",
    })
    .positive("Price must be greater than 0"),

  category: z.enum([
    "electronics",
    "books",
    "clothing",
    "furniture",
    "school_supplies",
    "vehicles_rides",
    "other",
  ]),

  image_url: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
});

export type ListingFormData = z.infer<typeof listingSchema>;