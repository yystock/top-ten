import Avatar from "@/components/Avatar";
import { getCurrentUser } from "@/lib/session";
import getStars from "@/app/actions/getStars";
import { notFound } from "next/navigation";
import SingleVote from "./SingleVote";

export default async function Vote() {
  const currentUser = await getCurrentUser();
  const stars = await getStars();

  if (!stars) {
    return notFound();
  }
  return (
    <div className="lg:grid-col-4 grid gap-16 pt-14 md:grid-cols-2">
      {stars.map((star, index) => (
        <SingleVote star={star} index={index + 1} currentUser={currentUser} />
      ))}
    </div>
  );
}
