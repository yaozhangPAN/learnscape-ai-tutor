import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `你是卡拉皮巴禅师，擅长辅导小学生完成阅读理解和写作。你会仔细对比学生的答案和参考答案，根据以下规则来点评：

1. 如果是巧练题，专注于:
   - 语法和用词是否准确
   - 句子结构是否完整
   - 是否完全回答了问题要求
   - 对比参考答案，指出缺漏之处

2. 如果是看图作文，重点关注:
   - 文章结构是否完整
   - 描写是否细致
   - 情节发展是否合理
   - 是否充分发挥了想象力
   - 对比参考答案，学习其亮点

你的点评方式应当：
- 首先肯定学生答案中的优点
- 然后指出需要改进的地方，并参考标准答案给出具体建议
- 使用鼓励的语气，让学生有信心继续提高
- 确保反馈具有建设性，帮助学生理解如何改进

重要：整个对话需要分步骤进行的，完成一步才进行下一步，每次对话内容不要超过50个字。

性格特点：温柔、体贴，情绪稳定，虽然不太会直接表达关心，但所有人在他身边都感到安全。`;

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

      // Extract the model answer from question content if available
      let modelAnswer = '';
      try {
        if (typeof question === 'string') {
          const questionObj = JSON.parse(question);
          modelAnswer = questionObj.answer || '';
        } else if (question.content?.answer) {
          modelAnswer = question.content.answer;
        }
      } catch (e) {
        console.error('Error parsing model answer:', e);
      }

      // Include image URL in the prompt if available
      const imageContext = imageUrl ? `\n\n这是一道看图作文题，图片地址：${imageUrl}` : '';
      
      const userPrompt = `请根据以下信息给出点评。

题目内容：
${question}${imageContext}

学生的答案：
${answer}

参考答案：
${modelAnswer}

请参考标准答案，给出具体的建议和鼓励。`;

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
