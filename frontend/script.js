document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let type = document.getElementById("type").value;
  let tone = document.getElementById("tone").value;
  let subject = document.getElementById("subject").value;
  let recipient = document.getElementById("recipient").value;
  let details = document.getElementById("details").value;

  fetch("http://localhost:5002/generate", {
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

    // If user typed subject → override backend
    let finalSubject = subject ? subject : data.subject;

    document.getElementById("outSubject").innerText = finalSubject;
    document.getElementById("outBody").innerText = data.body;
  });
});

// Copy button
function copyEmail() {
  let text =
    document.getElementById("outSubject").innerText + "\n\n" +
    document.getElementById("outBody").innerText;

  navigator.clipboard.writeText(text);
  alert("Copied!");
}