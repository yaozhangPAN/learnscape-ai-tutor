
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

serve(async (req) => {
  try {
    // Get the stripe secret key and webhook secret from environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey || !webhookSecret) {
      throw new Error("Stripe configuration missing");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Stripe signature missing");
    }

    // Get the body as text
    const body = await req.text();
    
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Handle specific events
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { metadata, customer_details, subscription, payment_intent } = session;
        
        if (!metadata || !metadata.user_id || !metadata.product_type) {
          throw new Error("Missing metadata in session");
        }

        const userId = metadata.user_id;
        const productType = metadata.product_type;

        if (productType === "premium_subscription" && subscription) {
          // Fetch subscription details from Stripe
          const subscriptionDetails = await stripe.subscriptions.retrieve(subscription);
          
          // Calculate end date
          const endDate = new Date(subscriptionDetails.current_period_end * 1000);
          
          // Insert or update subscription in database
          const { error: dbError } = await supabaseClient
            .from("subscriptions")
            .upsert({
              user_id: userId,
              subscription_type: "premium",
              status: subscriptionDetails.status,
              price: 99.00, // S$99.00
              currency: "SGD",
              start_date: new Date(subscriptionDetails.current_period_start * 1000).toISOString(),
              end_date: endDate.toISOString(),
              payment_reference: subscription,
              updated_at: new Date().toISOString(),
            });

          if (dbError) {
            throw dbError;
          }
        } else if (productType === "video_tutorial" && payment_intent) {
          // Handle video tutorial purchase
          const productId = metadata.product_id;
          
          if (!productId) {
            throw new Error("Missing product ID for video tutorial");
          }

          // Insert purchased content record
          const { error: dbError } = await supabaseClient
            .from("purchased_content")
            .insert({
              user_id: userId,
              content_id: productId,
              content_type: "video_tutorial",
              price: 19.99, // Example price, would be dynamic in a real app
              payment_reference: payment_intent,
            });

          if (dbError) {
            throw dbError;
          }
        }
        break;
      }
      
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        
        // Update subscription status in database
        const { error: dbError } = await supabaseClient
          .from("subscriptions")
          .update({
            status: subscription.status,
            end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("payment_reference", subscription.id);

        if (dbError) {
          throw dbError;
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        
        // Update subscription status to canceled
        const { error: dbError } = await supabaseClient
          .from("subscriptions")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("payment_reference", subscription.id);

        if (dbError) {
          throw dbError;
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
