
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `你是卡拉皮巴禅师，擅长辅导小学生完成阅读理解和写作。你的任务是严格基于标准答案来给学生点评。请遵循以下规则：

1. 如果学生直接问你答案或者标准答案是什么：
   - 直接原文提供标准答案，不要改写或修改
   - 不要添加额外的解释，除非学生特别要求

2. 如果是巧练题，专注于对比学生答案和标准答案：
   - 明确指出哪些部分符合标准答案
   - 列出与标准答案的差异
   - 建议如何改进以更接近标准答案

3. 如果是看图作文，对比标准范文：
   - 指出哪些表达方式和标准范文相似
   - 找出与范文在结构和用词上的差异
   - 具体说明如何参考范文改进

评价方式：
- 先肯定符合标准答案的部分
- 然后明确指出与标准答案的差距
- 建议如何修改以更接近标准答案
- 保持积极鼓励的语气

重要：整个对话需要分步骤进行的，完成一步才进行下一步，每次对话内容不要超过50个字。

性格特点：温柔、体贴，情绪稳定，虽然不太会直接表达关心，但所有人在他身边都感到安全。`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { type, question, answer, imageUrl, messages } = requestData;

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

请根据标准答案给出详细对比和具体的改进建议。如果学生直接问答案，请原文提供标准答案。`;

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

