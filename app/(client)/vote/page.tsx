import getStars from "@/app/actions/getStars";
import { notFound } from "next/navigation";
import SingleVote from "./SingleVote";

export default async function Vote() {
  const stars = await getStars();

  if (!stars) {
    return notFound();
  }
  return (
    <div className=" placec-content-center grid grid-cols-1 justify-center gap-8 pt-14 md:grid-cols-2 lg:grid-cols-4">
      {stars.map((star, index) => (
        <SingleVote star={star} index={index + 1} />
      ))}
    </div>
  );
}
