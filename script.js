document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let type = document.getElementById("type").value;
  let tone = document.getElementById("tone").value;
  let recipient = document.getElementById("recipient").value;
  let details = document.getElementById("details").value;

  fetch("https://devops-project-96a8.onrender.com/generate") // 🔥 CHANGE THIS
  .then(() => {}) // dummy to avoid lint
  fetch("https://devops-project-96a8.onrender.com/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type,
      tone,
      recipient,
      details
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("outSubject").innerText = data.subject;
    document.getElementById("outBody").innerText = data.body;
  });
});

// Copy
function copyEmail() {
  let text =
    document.getElementById("outSubject").innerText + "\n\n" +
    document.getElementById("outBody").innerText;

  navigator.clipboard.writeText(text);
  alert("Copied!");
}