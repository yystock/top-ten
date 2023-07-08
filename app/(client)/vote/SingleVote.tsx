"use client";

import { Star } from "@prisma/client";
import { FC, useState } from "react";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Nabla } from "next/font/google";
import { cn } from "@/lib/utils";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import isToday from "date-fns/isToday";
import { Crown } from "lucide-react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { parseISO } from "date-fns";

interface SingleVoteProps {
  star: Star;
  index: number;
}

const nabla = Nabla({ subsets: ["latin"] });

const SingleVote: FC<SingleVoteProps> = ({ star, index }) => {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  async function onVote(starId: number) {
    setLoading(true);

    if (!session) {
      loginModal.onOpen();
      return;
    }

    axios
      .post("/api/votes", { userId: session.user.id, starId: star.id })
      .then(() => {
        update({ lastTimeVote: new Date() });
        router.refresh();
        toast.success("Thanks for your vote!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });

    return null;
  }

  return (
    <>
      {index === 1 ? (
        <div className="relative flex flex-col items-center md:col-span-2 lg:col-span-4">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
          <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12" color="yellow" />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p className=" ">{star.vote}</p>
          <Button className="my-2" isLoading={loading} onClick={() => onVote(star.id)}>
            Vote
          </Button>
        </div>
      ) : index === 2 ? (
        <div className="relative flex flex-col items-center lg:col-span-2">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
          <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12" color="#C0C0C0" />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" isLoading={loading} onClick={() => onVote(star.id)}>
            Vote
          </Button>
        </div>
      ) : index === 3 ? (
        <div className="relative flex flex-col items-center lg:col-span-2">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>
          <Crown className="absolute -top-14 right-1/3 z-10 h-20 w-20 rotate-12 " color="#b87333" />
          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" isLoading={loading} onClick={() => onVote(star.id)}>
            Vote
          </Button>
        </div>
      ) : (
        <div className="relative col-span-1 flex flex-col items-center">
          <p className={cn("absolute right-3/4 top-5 text-2xl", nabla.className)}>{index}</p>

          <Image alt="star" className="rounded-full" src={star.picture || "/images/placeholder.jpg"} width={160} height={160} />
          <p className="mt-1">{star.name}</p>
          <p>{star.vote}</p>
          <Button className="my-2" isLoading={loading} onClick={() => onVote(star.id)}>
            Vote
          </Button>
        </div>
      )}
    </>
  );
};

export default SingleVote;
