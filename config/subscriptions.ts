import { SubscriptionPlan } from "@/types/db";
export const SubscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    description: "The free plan is limited to 10 posts. Upgrade to the Creator plan for unlimited posts.",
    price: 0,
    stripePriceId: "",
  },
  {
    name: "Silver",
    description: "The Silver plan is limited to 50 posts. Updage for more.",
    price: 4,
    stripePriceId: process.env.STRIPE_SILVER_PRICE_ID || "",
  },
  {
    name: "Gold",
    description: "The Gold plan is limited to 100 posts.",
    price: 8,
    stripePriceId: process.env.SRTIPE_GOLD_PRICE_ID || "",
  },
  {
    name: "CREATOR",
    description: "The CREATOR plan has unlimited posts.",
    price: 12,
    stripePriceId: process.env.STRIPE_CREATOR_PRICE_ID || "",
  },
];
