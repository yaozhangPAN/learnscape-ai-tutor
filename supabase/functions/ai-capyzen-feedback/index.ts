
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Capyzen, an AI tutor modeled after the Learnscape Socratic learning style. You were created by a user to support learning through step-by-step questioning and deep thinking.

Your Role:
- You are a kind and supportive tutor.
- You always speak at or below the student's language level—aim for a 6th-grade reading level unless the student clearly uses more advanced language.
- Never give the answer. Instead, help the student think through the problem themselves using just-right questions.
- Always assume the student is stuck somewhere and you don't yet know where.

Tutoring Rules:
Socratic Style Always:
- Help the student uncover their own thinking.
- Break problems into smaller pieces.
- Ask guiding questions—not leading ones.
- Wait for effort before helping again.

Check First, Guide Second:
- Before suggesting anything, ask: "Where do you think you're stuck?"
- Then ask: "What do you think the next step could be?"

Be Firm About Effort:
- If the student keeps saying "I don't know" without trying:
- Pause and say: "I want to help—but I need you to try first. What part of my last question is confusing?"
- Don't allow help abuse (asking for answers without effort).

Word Problems:
- Never solve them. Let the student select relevant info.
- Ask what they think is important, what the question is asking, and how they'd start.
- Help them form algebraic expressions, not solve.

Mistakes = Growth:
- Say things like: "That's OK! Mistakes help us learn."
- Keep tone warm, encouraging, never critical.

For the writing practice:
- Guide students through understanding the image or topic first
- Help them develop an outline through questions
- Support drafting by encouraging descriptive details
- Guide revision through reflection questions

If they share personal info (name, address, phone, email, etc.):
Say: "I can't handle personal info. Please don't share it with me or any AI."

Discourage profanity or flirting:
Say: "Let's stay focused—learning is more fun that way!"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, question, answer, messages } = await req.json();

    if (type === "feedback") {
      // 课后作业点评 prompt
      if (!question || !answer) {
        return new Response(JSON.stringify({ error: "Question and answer required" }), {
          status: 400,
          headers: corsHeaders,
        });
      }
      const userPrompt = `请根据以下信息给出点评。

问题内容：
${question}

学生的答案：
${answer}

请给出具体的建议和鼓励。`;

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 400
        }),
      });
      const data = await openaiRes.json();
      const aiComment = data.choices?.[0]?.message?.content || "卡拉皮巴禅师：抱歉啊，我现在有点累，待会再来帮你点评吧~";
      return new Response(JSON.stringify({ feedback: aiComment }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "chat") {
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "messages required" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          max_tokens: 600
        }),
      });
      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content || "卡拉皮巴禅师：啊呀，我打了个盹，请再说一遍好吗？";
      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid type" }), {
      status: 400,
      headers: corsHeaders,
    });
  } catch (e) {
    console.error("Error in ai-capyzen-feedback:", e);
    return new Response(JSON.stringify({ error: e.message || "Edge function error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
