"use client";

import { Star } from "@prisma/client";
import { FC, useState } from "react";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Nabla } from "next/font/google";
import { cn } from "@/lib/utils";
import axios from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { isToday } from "date-fns";
interface SingleVoteProps {
  star: Star;
  index: number;
  currentUser?: User;
}

const nabla = Nabla({ subsets: ["latin"] });

const SingleVote: FC<SingleVoteProps> = ({ star, index, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function vote(starId: number) {
    setLoading(true);

    axios
      .post("/api/votes", { userId: currentUser?.id, starId: star.id })
      .then(() => {
        toast.success("Thanks for your vote!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });

    return null;
  }
  return (
    <div>
      {index === 0 ? (
        <div className="relative col-span-1 flex flex-col items-center md:col-span-2 lg:col-span-4 ">
          <p className={cn("absolute left-1/4 top-1/4 text-2xl", nabla.className)}>{index + 1}</p>
          <Icons.crown className="z-10 h-24 w-24 " />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p>{star.name}</p>
          <p>{star.vote}</p>
          <Button disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
            Vote
          </Button>
        </div>
      ) : (
        <div className="relative col-span-1 flex flex-col items-center ">
          <p className={cn("absolute left-1/4 top-1/4 text-2xl", nabla.className)}>{index + 1}</p>
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p>{star.name}</p>
          <p>{star.vote}</p>
          <Button disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
            Vote
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleVote;
