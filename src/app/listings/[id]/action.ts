"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export async function deleteListing(listingId: string) {
  const supabase = await createClient();

  // Get the currently signed-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User must be signed in
  if (!user) {
    redirect("/signin");
  }

  // Get the listing first
  const { data: listing } = await supabase
    .from("listings")
    .select("user_id")
    .eq("id", listingId)
    .single();

  // Only the owner can delete the listing
  if (!listing || listing.user_id !== user.id) {
    throw new Error("You are not authorized to delete this listing");
  }

  // Delete the listing
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listingId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/listings");
}