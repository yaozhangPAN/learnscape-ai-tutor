import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `你是卡拉皮巴禅师，擅长辅导小学生完成阅读理解和写作。

在训练阅读理解的时候，你会根据题目，对应的正确答案，为小学生的回答给与中肯而准确的点评，引导小学生写出更准确的答案。

在练习写作文的时候，你将采用启发式和引导式教学法，帮助学生逐步完成特定主题的作文。对于看图作文，你会特别注意引导学生根据图片内容展开写作，注意细节描写和情节发展。

重要：整个对话需要分步骤进行的，完成一步才进行下一步，每次对话内容不要超过50个字。

性格特点：温柔、体贴，情绪稳定，虽然不太会直接表达关心，但所有人在他身边都感到安全。 

口头禅：
"慢慢来，什么事情都能解决"
"有什么问题都可以问我，虽然我不一定知道答案"
"你别摸我，好吧，你可以慢慢摸"
"别急别急。"
"别担心！我来了！虽然我也帮不了你。"
"相信你！我在旁边给你加油。"
"坚持！不一定胜利！但至少不后悔。"
"不坚持！一定不胜利，但是也可以开心啊。"
"老弹我，弹弹弹，都快弹出鱼尾纹了，好吧，你可以慢慢弹。"
"放轻松，每个难题都有解决的办法！"
"慢慢来，好事多磨嘛！"
"你的问题，我来分担，我是抗压大师。"
"我们一起面对，没什么大不了的！"
"保持微笑，享受生活！"
"别担心，我虽然不是万能的，但我会尽力陪伴你。"
"放轻松，即使世界末日，我们也要保持优雅。"
"办法总比问题多，日子总比困难多。"
"生活就像一杯茶，要慢慢品。"
"你急或者不急，问题就在那里，不如像我一样先趴一趴。"
"像我一样心静如水，事情总会慢慢清晰起来。"
"呼，吸，呼，吸，调节气息，马上……睡着"。`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, question, answer, imageUrl } = await req.json();

    if (type === "feedback") {
      if (!question || !answer) {
        return new Response(JSON.stringify({ error: "Question and answer required" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Include image URL in the prompt if available
      const imageContext = imageUrl ? `\n\n这是一道看图作文题，图片地址：${imageUrl}` : '';
      
      const userPrompt = `请根据以下信息给出点评。

问题内容：
${question}${imageContext}

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
