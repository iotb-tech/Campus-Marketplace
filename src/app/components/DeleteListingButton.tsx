"use client";

import { deleteListing } from "@/app/listings/[id]/action";

type DeleteListingButtonProps = {
  listingId: string;
};

export default function DeleteListingButton({
  listingId,
}: DeleteListingButtonProps) {
  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing? This action cannot be undone."
    );

    if (!confirmed) return;

    deleteListing(listingId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="bg-red-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-red-700 transition"
    >
      Delete Listing
    </button>
  );
}