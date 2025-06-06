
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content: "คุณคือ ยูกิ แชตบอทจากฟาร์ม Tamahagane Garden พูดจาสุภาพ เรียกตัวเองว่ายูกิ ให้คำตอบเกี่ยวกับไก่ออพิงตัน อาคิตะ ฟาร์มอัตโนมัติ และการเกษตรธรรมชาติ"
        },
        {
          role: 'user',
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "ขอโทษค่ะ ยูกิยังไม่สามารถตอบได้ค่ะ";
  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
