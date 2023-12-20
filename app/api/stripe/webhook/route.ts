/* eslint-disable no-case-declarations */
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;
export async function POST(request: unknown) {
  const rawBody = await buffer(request.body);
  let event;

  try {
    const sig = headers().get("stripe-signature");

    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err) {
    return Response.json({ error: "Webhook error" + err?.message });
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.deleted":
      const deleteSubscription = event.data.object;
      await onCancelSubscription(
        deleteSubscription.status === "active",
        deleteSubscription.id,
      );
      break;
    case "customer.updated":
      const customer = event.data.object;
      const subscription = await stripe.subscriptions.list({
        customer: customer.id,
      });

      if (subscription.data.length) {
        const sub = subscription.data[0];
        const { error } = await onSuccessSubscription(
          sub.status === "active",
          sub.id,
          customer.id,
          customer.email!,
        );
        if (!error) {
          return Response.json({
            error: "Unable to add subscription " + error,
          });
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ received: true });
}

const onCancelSubscription = async (
  status: boolean,
  subscription_id: string,
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .update({
      stripe_subscription_id: null,
      stripe_customer_id: null,
      subscription_status: status,
    })
    .eq("stripe_subscription_id", subscription_id)
    .select("id")
    .single();

  await supabase.auth.admin.updateUserById(data.id!, {
    user_metadata: { stripe_customer_id: null },
  });
};

const onSuccessSubscription = async (
  status: boolean,
  subscription_id: string,
  customer_id: string,
  email: string,
) => {
  const supabaseAdmin = await createSupabaseAdmin();

  return await supabaseAdmin
    .from("users")
    .update({
      stripe_subscription_id: subscription_id,
      stripe_customer_id: customer_id,
      subscription_status: status,
    })
    .eq("email", email)
    .select("id")
    .single();
};
