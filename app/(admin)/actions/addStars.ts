"use server";
import { db } from "@/lib/db";
interface addStarsProps {
  name: string;
  profile: string;
  vote: number;
}
async function addStars({ name, profile, vote }: addStarsProps) {
  const data = await db.star.create({
    data: {
      name: name,
      profile: profile,
      vote: vote,
    },
  });
  return data;
}

export default addStars;
