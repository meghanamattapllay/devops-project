document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let type = document.getElementById("type").value;
  let tone = document.getElementById("tone").value;
  let subject = document.getElementById("subject").value;
  let recipient = document.getElementById("recipient").value;
  let details = document.getElementById("details").value;

  fetch("https://devops-project-96a8.onrender.com/generate")  // your backend URL
  .then(res => res.json())
  .then(data => {

    let finalSubject = subject ? subject : data.subject;

    document.getElementById("outSubject").innerText = finalSubject;
    document.getElementById("outBody").innerText = data.body;

    // 🔥 SHOW RESULT
    document.getElementById("resultSection").classList.remove("hidden");

    // 🔥 SCROLL TO RESULT
    document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
  });
});