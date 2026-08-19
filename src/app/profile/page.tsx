import { redirect } from "next/navigation";
import { getProfile } from "./actions";
import EnhancedUserProfile from "../components/EnhancedUserProfile";

export default async function ProfilePage() {
  const profile = await getProfile();
  if (!profile) redirect("/signin");

  return <EnhancedUserProfile initialProfile={profile} />;
}
