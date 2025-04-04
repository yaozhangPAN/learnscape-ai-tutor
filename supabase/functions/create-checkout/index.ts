
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the STRIPE_SECRET_KEY from the environment
  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: "Stripe secret key not configured" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Parse the request body
    const { productType, productId } = await req.json();
    
    // Retrieve user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Check if an existing Stripe customer record exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Define the Stripe checkout session parameters based on the product type
    let sessionParams: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      success_url: `${req.headers.get("origin")}/payment-success?type=${productType}${productId ? `&id=${productId}` : ''}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled`,
    };

    // Configure line items based on product type
    if (productType === "premium_subscription") {
      // Premium subscription (S$99/month)
      sessionParams = {
        ...sessionParams,
        line_items: [
          {
            price_data: {
              currency: "sgd",
              product_data: { 
                name: "Premium Access Pass",
                description: "Access to AI tutor, daily recommendations, and more premium features"
              },
              unit_amount: 9900, // S$99.00
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        metadata: {
          user_id: user.id,
          product_type: "premium_subscription"
        }
      };
    } else if (productType === "video_tutorial") {
      // Individual video tutorial purchase
      if (!productId) {
        throw new Error("Product ID is required for video tutorial purchase");
      }
      
      // Determine the price based on the course type and ID
      let videoPrice = 39900; // Default price for tutorial courses: S$399
      let videoTitle = "PSLE Tutorial"; // Default title
      
      // Check if it's a past paper walkthrough course (IDs 9-13 are past papers)
      if (["9", "10", "11", "12", "13"].includes(productId)) {
        videoPrice = 4000; // S$40.00 for past paper walkthroughs
        videoTitle = "PSLE Past Paper Walkthrough";
      } else if (productId === "3" || productId === "8") {
        videoPrice = 49900; // S$499 for specific tutorial courses
        videoTitle = "PSLE Premium Tutorial";
      } else if (productId === "4") {
        videoPrice = 59900; // S$599 for the most premium tutorial
        videoTitle = "PSLE Advanced Tutorial";
      }
      
      sessionParams = {
        ...sessionParams,
        line_items: [
          {
            price_data: {
              currency: "sgd",
              product_data: { 
                name: videoTitle,
                description: "Individual video tutorial purchase"
              },
              unit_amount: videoPrice,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          user_id: user.id,
          product_type: "video_tutorial",
          product_id: productId
        }
      };
    } else {
      throw new Error("Invalid product type specified");
    }

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
