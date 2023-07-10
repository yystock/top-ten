import Pricing from "@/app/(client)/buy/Pricing";
import getUserSubscriptionPlan from "@/app/actions/getUserSubscription";
import { getCurrentUser } from "@/lib/session";
import { SubscriptionPlans } from "@/config/subscriptions";

export default async function PricingPage() {
  const user = await getCurrentUser();

  const userSubscription = await getUserSubscriptionPlan(user?.id);

  return (
    <div>
      <div className="sm:align-center sm:flex sm:flex-col">
        <h1 className="text-4xl font-extrabold  sm:text-center sm:text-6xl">Pricing Plans</h1>
        <p className="m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
          Start building for free, then add a site plan to go live. Account plans unlock additional features.
        </p>
      </div>
      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
        {SubscriptionPlans.map((subscription) => {
          const price = subscription.stripePriceId;
          if (!price) return null;
          return <Pricing user={user} userSubscription={userSubscription} subscription={subscription} />;
        })}
      </div>
    </div>
  );
}
