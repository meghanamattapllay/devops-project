document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let type = document.getElementById("type").value;
  let tone = document.getElementById("tone").value;
  let subject = document.getElementById("subject").value;
  let recipient = document.getElementById("recipient").value;
  let details = document.getElementById("details").value;

  // 🔥 Show loading
  document.getElementById("outBody").innerText = "Generating...";
  
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

    let finalSubject = subject ? subject : data.subject;

    document.getElementById("outSubject").innerText = finalSubject;
    document.getElementById("outBody").innerText = data.body;

    // 🔥 SHOW RESULT
    const resultSection = document.getElementById("resultSection");
    resultSection.classList.remove("hidden");

    // 🔥 SCROLL DOWN
    resultSection.scrollIntoView({
      behavior: "smooth"
    });

  })
  .catch(err => {
    document.getElementById("outBody").innerText = "Error generating email";
    console.log(err);
  });
});

/* COPY FUNCTION */
function copyEmail() {
  let text =
    document.getElementById("outSubject").innerText + "\n\n" +
    document.getElementById("outBody").innerText;

  navigator.clipboard.writeText(text);
  alert("Copied!");
}