
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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

  // Create a Supabase client with the service role key to bypass RLS
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
  
  // Regular client for auth
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Get user authentication data
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Parse the request body
    const { paymentReference, transactionId } = await req.json();
    
    if (!paymentReference) {
      throw new Error("Payment reference is required");
    }

    // Check if payment record exists and belongs to the user
    const { data: payment, error: paymentError } = await supabaseClient
      .from("paynow_payments")
      .select("*")
      .eq("payment_reference", paymentReference)
      .eq("user_id", user.id)
      .single();
    
    if (paymentError || !payment) {
      throw new Error("Payment record not found or does not belong to you");
    }
    
    if (payment.status === "completed") {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Payment has already been verified",
        payment: payment 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Update the payment status to "pending_verification"
    const { error: updateError } = await supabaseAdmin
      .from("paynow_payments")
      .update({ 
        status: "pending_verification",
        transaction_id: transactionId || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", payment.id);
    
    if (updateError) {
      throw new Error(`Failed to update payment status: ${updateError.message}`);
    }

    // If this is a premium subscription
    if (payment.product_type === "premium_subscription") {
      // For demo purposes, we'll automatically mark the subscription as active
      // In a production environment, this would happen after admin verification
      const { error: subscriptionError } = await supabaseAdmin
        .from("subscriptions")
        .upsert({
          user_id: user.id,
          subscription_type: "premium",
          status: "active",
          price: payment.amount / 100,
          currency: "SGD",
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          payment_reference: payment.payment_reference,
          updated_at: new Date().toISOString(),
        });

      if (subscriptionError) {
        console.error("Failed to create subscription:", subscriptionError);
      }
    } 
    // If this is a video tutorial purchase
    else if (payment.product_type === "video_tutorial" && payment.product_id) {
      // For demo purposes, we'll automatically mark the content as purchased
      // In a production environment, this would happen after admin verification
      const { error: purchaseError } = await supabaseAdmin
        .from("purchased_content")
        .insert({
          user_id: user.id,
          content_id: payment.product_id,
          content_type: "video_tutorial",
          price: payment.amount / 100,
          payment_reference: payment.payment_reference,
        });

      if (purchaseError) {
        console.error("Failed to record purchased content:", purchaseError);
      }
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Payment verification submitted successfully. Please wait for approval.",
      payment: {
        ...payment,
        status: "pending_verification"
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("ERROR in verify-payment:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
