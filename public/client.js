async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");
  const message = input.value.trim();
  if (!message) return;

  chatLog.innerHTML += `\nคุณ: ${message}`;
  input.value = "";

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  const reply = data.reply || "ยูกิขออภัยค่ะ ตอนนี้ยังไม่สามารถตอบได้";
  chatLog.innerHTML += `\nยูกิ: ${reply}`;
  chatLog.scrollTop = chatLog.scrollHeight;
}
