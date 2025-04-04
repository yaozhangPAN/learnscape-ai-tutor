
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

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Retrieve user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Query the database to check if the user has an active subscription
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient.rpc(
      'has_premium_subscription',
      { user_uuid: user.id }
    );

    if (subscriptionError) {
      throw subscriptionError;
    }

    // Check for purchased content if requested
    let purchasedContent = null;
    const url = new URL(req.url);
    const contentId = url.searchParams.get('content_id');
    const contentType = url.searchParams.get('content_type');

    if (contentId && contentType) {
      const { data: contentData, error: contentError } = await supabaseClient
        .from('purchased_content')
        .select('*')
        .eq('user_id', user.id)
        .eq('content_id', contentId)
        .eq('content_type', contentType)
        .maybeSingle();

      if (contentError) {
        throw contentError;
      }

      purchasedContent = contentData;
    }

    return new Response(
      JSON.stringify({
        isPremium: subscriptionData,
        purchasedContent: purchasedContent
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking subscription:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
