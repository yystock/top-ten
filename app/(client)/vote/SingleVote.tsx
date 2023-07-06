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
import { Crown } from "lucide-react";

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

    if (!currentUser) {
      router.push("/login");
      return;
    }

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
    <>
      {index === 1 ? (
        <div className="md:col-span-2 lg:col-span-4">
          <div className="relative flex flex-col items-center">
            <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
            <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12" color="yellow" />
            <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
            <p className="mt-1">{star.name}</p>
            <p className=" ">{star.vote}</p>
            <Button className="my-2" disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
              Vote
            </Button>
          </div>
        </div>
      ) : index === 2 ? (
        <div className="relative flex flex-col items-center md:col-span-1 lg:col-span-2">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
          <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12" color="#C0C0C0" />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
            Vote
          </Button>
        </div>
      ) : index === 3 ? (
        <div className="relative  flex flex-col items-center md:col-span-1 lg:col-span-2">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
          <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12 " color="#b87333" />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
            Vote
          </Button>
        </div>
      ) : (
        <div className="relative col-span-1 flex flex-col items-center">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>

          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" disabled={isToday(currentUser?.lastTimeVote)} isLoading={loading} onClick={() => vote(star.id)}>
            Vote
          </Button>
        </div>
      )}
    </>
  );
};

export default SingleVote;
