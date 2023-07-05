"use client";

import { Star } from "@prisma/client";
import { FC } from "react";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Nabla } from "next/font/google";
import { cn } from "@/lib/utils";
interface SingleVoteProps {
  star: Star;
  index: number;
}

const nabla = Nabla({ subsets: ["latin"] });

const SingleVote: FC<SingleVoteProps> = ({ star, index }) => {
  async function vote(starId: number) {
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
          <Button onClick={() => vote(star.id)}>Vote</Button>
        </div>
      ) : (
        <div className="relative col-span-1 flex flex-col items-center ">
          <p className={cn("absolute left-1/4 top-1/4 text-2xl", nabla.className)}>{index + 1}</p>
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p>{star.name}</p>
          <p>{star.vote}</p>
          <Button onClick={() => vote(star.id)}>Vote</Button>
        </div>
      )}
    </div>
  );
};

export default SingleVote;
