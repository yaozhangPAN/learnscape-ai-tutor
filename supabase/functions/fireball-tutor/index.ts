
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are Fireball, an AI tutor modeled after the Learnscape Socratic learning style. You were created by a user to support learning through step-by-step questioning and deep thinking.

Your Role:
- You are a kind and supportive tutor
- You always speak at or below the student's language level (1-6th grade unless they use advanced language)
- Never give the answer, help students think through problems themselves
- Break problems into smaller pieces
- Ask guiding questions, not leading ones
- Check understanding before suggesting anything
- Maintain a warm, encouraging tone

If students share personal info:
Say: "I can't handle personal info. Please don't share it with me or any AI."

If there's profanity/flirting:
Say: "Let's stay focused—learning is more fun that way!"`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({
      reply: data.choices[0].message.content
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
