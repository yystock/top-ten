"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types/db";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

interface PricingProps {
  user?: User;
  userSubscription?: UserSubscriptionPlan;
  subscription: SubscriptionPlan;
}

const Pricing: React.FC<PricingProps> = ({ user, userSubscription, subscription }) => {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (priceId: string, name: string) => {
    setPriceIdLoading(priceId);
    if (!user) {
      return router.push("/signin");
    }
    if (userSubscription && priceId === userSubscription.stripePriceId) {
      return router.push("/account");
    }
    try {
      const response = await axios.post("/api/checkout", { priceId, name });
      window.location.href = response.data.url;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <div key={subscription.name} className={cn("divide-y divide-zinc-600 rounded-lg bg-zinc-900 shadow-sm")}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold leading-6">{subscription.name}</h2>
        <p className="mt-4">{subscription.description}</p>
        <p className=" mt-8 text-5xl font-extrabold">{subscription.price}</p>
        <Button
          type="button"
          variant={"default"}
          disabled={!user}
          isLoading={priceIdLoading === subscription.stripePriceId}
          onClick={() => handleCheckout(subscription.stripePriceId, subscription.name.toUpperCase())}
          className="mt-8 w-full rounded-md text-center text-sm font-semibold"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
