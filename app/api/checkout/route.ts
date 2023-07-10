import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import getUserSubscriptionPlan from "@/app/actions/getUserSubscription";
import * as z from "zod";
import { CheckOutValidator } from "@/lib/validations/checkout";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { priceId, name } = CheckOutValidator.parse(body);
      console.log("priceId", priceId, name);

      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return new Response("Unauthorized", { status: 403 });
      }

      const currentSubscription = await getUserSubscriptionPlan(currentUser.id);
      if (!currentSubscription) {
        return new Response("Unauthorized", { status: 403 });
      }
      if (currentSubscription.stripeCustomerId && !currentSubscription?.subscription.localeCompare("NORMAL")) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: currentSubscription.stripeCustomerId,
          return_url: "/",
        });

        return new Response(JSON.stringify({ url: stripeSession.url }));
      }
      const order = await db.order.create({
        data: {
          product: name,
          isPaid: false,
          userId: currentUser.id,
        },
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price: priceId,
          },
        ],
        mode: "subscription",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        customer_email: currentUser.email!,
        success_url: `/payment/success`,
        cancel_url: `/payment/canceled`,
        metadata: {
          subscriptionName: name,
          orderId: order.id,
          userId: currentUser.id,
        },
      });
    } catch (err) {
      console.log("CHECKOUT_POST[ERROR]", err);
      if (err instanceof z.ZodError) {
        return new Response(JSON.stringify(err.issues), { status: 422 });
      }
      return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }), {
        status: 500,
      });
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
