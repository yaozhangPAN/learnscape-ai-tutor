
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

    // Generate a unique payment reference
    const paymentReference = crypto.randomUUID();
    
    // Determine the product details and price based on product type
    let productName = "Unknown Product";
    let productDescription = "";
    let productPrice = 0;
    
    if (productType === "premium_subscription") {
      productName = "Premium Access Pass";
      productDescription = "Access to AI tutor, daily recommendations, and more premium features";
      productPrice = 9900; // S$99.00
    } else if (productType === "video_tutorial") {
      if (!productId) {
        throw new Error("Product ID is required for video tutorial purchase");
      }
      
      // Determine the price based on the course type and ID
      productPrice = 39900; // Default price for tutorial courses: S$399
      productName = "PSLE Tutorial"; // Default title
      
      // Check if it's a past paper walkthrough course (IDs 9-13 are past papers)
      if (["9", "10", "11", "12", "13"].includes(productId)) {
        productPrice = 4000; // S$40.00 for past paper walkthroughs
        productName = "PSLE Past Paper Walkthrough";
      } else if (productId === "3" || productId === "8") {
        productPrice = 49900; // S$499 for specific tutorial courses
        productName = "PSLE Premium Tutorial";
      } else if (productId === "4") {
        productPrice = 59900; // S$599 for the most premium tutorial
        productName = "PSLE Advanced Tutorial";
      }
    } else {
      throw new Error("Invalid product type specified");
    }
    
    // Format price for display (converting cents to dollars)
    const formattedPrice = `S$${(productPrice / 100).toFixed(2)}`;
    
    // Create a pending payment record in the database
    const { data: paymentData, error: paymentError } = await supabaseClient
      .from("paynow_payments")
      .insert({
        user_id: user.id,
        payment_reference: paymentReference,
        product_type: productType,
        product_id: productId || null,
        amount: productPrice,
        status: "pending",
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (paymentError) {
      throw new Error(`Failed to create payment record: ${paymentError.message}`);
    }

    // PayNow payment information
    const paymentInfo = {
      reference: paymentReference,
      productName: productName,
      productDescription: productDescription,
      amount: formattedPrice,
      paymentId: paymentData.id,
      payeeUEN: "202401234K", // Replace with your actual company UEN
      payeeName: "LearnScape Education Pte Ltd", // Replace with your actual company name
      paymentInstructions: [
        "Open your bank app and select 'Scan & Pay'",
        "Scan the QR code or enter the UEN manually",
        "Enter the exact amount shown",
        "Include the reference number in the comments/reference field",
        "Complete the payment and take a screenshot for your records"
      ],
      // Redirect URLs
      successUrl: `${req.headers.get("origin")}/payment-verification?reference=${paymentReference}&type=${productType}${productId ? `&id=${productId}` : ''}`
    };

    console.log("Created PayNow payment request:", paymentReference);

    return new Response(JSON.stringify({ paymentInfo }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating payment request:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
