"use server";

import { createClient } from "@/app/lib/supabase/server";

export interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  major: string;
  bio: string;
  graduationYear: string;
}

export async function getProfile(): Promise<ProfileData | null> {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getClaims();
  if (!authData?.claims) return null;

  const userId = authData.claims.sub;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, phone_number, major, bio, graduation_year")
    .eq("id", userId)
    .single();

  const email = authData.claims.email ?? "";

  return {
    fullName: profile?.name ?? "",
    email,
    phoneNumber: profile?.phone_number ?? "",
    major: profile?.major ?? "",
    bio: profile?.bio ?? "",
    graduationYear: profile?.graduation_year ?? "",
  };
}

export async function updateProfile(data: ProfileData) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getClaims();
  if (!authData?.claims) throw new Error("Not authenticated");

  const userId = authData.claims.sub;

  const { error } = await supabase
    .from("profiles")
    .update({
      name: data.fullName,
      phone_number: data.phoneNumber,
      major: data.major,
      bio: data.bio,
      graduation_year: data.graduationYear,
    })
    .eq("id", userId);

  if (error) throw error;
}
