async function sendMessage() {
  const input = document.getElementById("userInput").value;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();
  document.getElementById("chatLog").innerHTML += `<p><b>ยูกิ:</b> ${data.reply}</p>`;
}

