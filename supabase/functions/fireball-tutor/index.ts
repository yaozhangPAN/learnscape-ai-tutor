
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    // Extract image URL from the prompt if present
    const imageUrlMatch = prompt.match(/\[上传的图片: (.*?)\]/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
    
    // Clean prompt by removing the image URL syntax
    const cleanPrompt = prompt.replace(/\[上传的图片: .*?\]/, '').trim();

    // Prepare messages array
    const messages = [
      { 
        role: "system", 
        content: "你是一位有专业知识的作文教师。当用户分享图片时，请仔细分析并生成一套合适的看图写作题目信息，包括标题、年级、字数要求和具体题目要求。请以JSON格式返回结果。" 
      }
    ];

    // If there's an image, add it to the messages with content format for GPT-4 Vision
    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: cleanPrompt },
          { 
            type: "image_url", 
            image_url: {
              url: imageUrl
            }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: cleanPrompt
      });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 1000
      }),
    });
    
    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "抱歉，我现在无法理解这个问题。";
    
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error in fireball-tutor:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
