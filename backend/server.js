const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   Utility Functions
========================= */

function cleanText(text) {
  return text.replace(/for for/g, "for")
             .replace(/\s+/g, " ")
             .trim();
}

/* =========================
   Email Generator Function
========================= */

function generateEmail(type, tone, recipient, details) {

  let greeting = "Dear";
  let closing = "Sincerely";

  if (tone === "Friendly") {
    greeting = "Hi";
    closing = "Thanks";
  } else if (tone === "Formal") {
    greeting = "Respected";
    closing = "Yours faithfully";
  }

  details = cleanText(details);

  let subject = "";
  let body = "";

  switch (type) {

    case "Leave Request":
      subject = "Leave Request";
      body = `${greeting} ${recipient},

I hope this message finds you well.

I would like to inform you that I will be unable to attend due to ${details}. I kindly request you to grant me leave for this period.

I will ensure that all pending work is completed at the earliest.

Thank you for your understanding.

${closing},
Your Name`;
      break;

    case "Apology":
      subject = "Apology";
      body = `${greeting} ${recipient},

I sincerely apologize for ${details}. I deeply regret any inconvenience caused.

I take full responsibility and will ensure that this does not happen again.

Thank you for your patience.

${closing},
Your Name`;
      break;

    case "Thank You":
      subject = "Thank You";
      body = `${greeting} ${recipient},

I would like to express my sincere gratitude for ${details}. Your support means a lot to me.

I truly appreciate your time and effort.

${closing},
Your Name`;
      break;

    case "Invitation":
      subject = "Invitation";
      body = `${greeting} ${recipient},

I hope you are doing well.

I am pleased to invite you to ${details}. It would be an honor to have your presence.

Kindly let me know your availability.

${closing},
Your Name`;
      break;

    case "Meeting":
      subject = "Meeting Request";
      body = `${greeting} ${recipient},

I hope you are doing well.

I would like to schedule a meeting regarding ${details}. Please let me know a convenient time.

Looking forward to your response.

${closing},
Your Name`;
      break;

    case "Complaint":
      subject = "Complaint";
      body = `${greeting} ${recipient},

I would like to bring to your attention an issue regarding ${details}. This requires immediate attention.

Kindly look into this matter and resolve it as soon as possible.

${closing},
Your Name`;
      break;

    case "Resignation":
      subject = "Resignation Letter";
      body = `${greeting} ${recipient},

I would like to formally resign from my position due to ${details}.

I am grateful for the opportunities and experiences gained during my tenure.

Please guide me through the resignation process.

${closing},
Your Name`;
      break;

    case "Follow-up":
      subject = "Follow-up";
      body = `${greeting} ${recipient},

I am writing to follow up regarding ${details}. Kindly provide any updates at your convenience.

Looking forward to your response.

${closing},
Your Name`;
      break;

    default:
      subject = type;
      body = `${greeting} ${recipient},

I am writing regarding ${details}.

${closing},
Your Name`;
  }

  return { subject, body };
}

/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.send("🚀 Smart Email Generator API is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.post("/generate", (req, res) => {
  const { type, tone, recipient, details } = req.body;

  if (!type || !recipient || !details) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const email = generateEmail(type, tone, recipient, details);

  res.json(email);
});

/* =========================
   Start Server
========================= */

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}`);
});