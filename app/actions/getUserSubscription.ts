import { db } from "@/lib/db";

export default async function getUserSubscriptionPlan(userId?: string) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      subscription: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw null;
  }

  return {
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
  };
}
