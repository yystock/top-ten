"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 2,
        }}
      >
        <div className="grid grid-rows-2 gap-8 pb-8 sm:grid-cols-2  md:grid-rows-1">
          <div className="row-start-2 flex flex-col items-start justify-center sm:row-start-1">
            <h1 className="text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl">
              a <strong>S m a L L</strong> <hr />
              kpop community.
            </h1>
            <p className="mb-6 mt-4">Just trying to build a clean kpop site.</p>
            <Button>Check out Community</Button>
          </div>
          <div className="flex w-full">
            <div className="z-10 h-full w-full bg-blend-overlay">
              <Image
                src="/images/anime_2.jpg"
                className="rounded-3xl opacity-75 bg-blend-color-burn"
                alt="character-1"
                quality={100}
                width={612}
                height={383}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
