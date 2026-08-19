"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function MarkSoldButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const markSold = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("listings")
      .update({ status: "sold" })
      .eq("id", listingId);
    setLoading(false);
    if (!error) router.refresh();
  };

  return (
    <button
      onClick={markSold}
      disabled={loading}
      className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Updating..." : "Mark Sold"}
    </button>
  );
}