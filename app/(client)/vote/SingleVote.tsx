"use client";

import { Star } from "@prisma/client";
import { FC } from "react";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
interface SingleVoteProps {
  star: Star;
  index: number;
}

const SingleVote: FC<SingleVoteProps> = ({ star, index }) => {
  async function vote(starId: number) {
    return null;
  }
  return (
    <div>
      {index === 0 ? (
        <div className="col-span-1 flex flex-col items-center md:col-span-2 lg:col-span-4 ">
          <Icons.crown className="z-10 h-24 w-24 " />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p>{star.name}</p>
          <p>{star.vote}</p>
          <Button onClick={() => vote(star.id)}>Vote</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
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
