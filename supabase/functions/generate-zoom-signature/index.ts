
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// HMAC SHA-256 cryptographic function for signature generation
const generateSignature = (apiKey: string, apiSecret: string, meetingNumber: string, role: number): string => {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(`${apiKey}${meetingNumber}${timestamp}${role}`).toString()
  
  const hash = Deno.createHash("sha256")
    .update(apiSecret)
    .update(msg)
    .digest("base64")

  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  
  return signature
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const { meetingNumber, role = 0 } = await req.json()
    
    // Validate the input
    if (!meetingNumber) {
      return new Response(
        JSON.stringify({ error: 'Meeting number is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the Zoom credentials from Supabase secrets
    const zoomSdkKey = Deno.env.get('ZOOM_SDK_KEY')
    const zoomSdkSecret = Deno.env.get('ZOOM_SDK_SECRET')
    
    if (!zoomSdkKey || !zoomSdkSecret) {
      return new Response(
        JSON.stringify({ error: 'Zoom credentials are not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }
    
    // Generate the signature
    const signature = generateSignature(
      zoomSdkKey,
      zoomSdkSecret,
      meetingNumber,
      role
    )
    
    // Return the signature
    return new Response(
      JSON.stringify({ 
        signature,
        sdkKey: zoomSdkKey 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating Zoom signature:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate signature' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
