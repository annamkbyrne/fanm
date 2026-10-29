// /api/affirmation is proxied to https://www.affirmations.dev by netlify.toml (avoids CORS).
const API_URL = "/api/affirmation";

const FALLBACKS = [
  "You are enough just as you are.",
  "You've got this.",
  "Your potential is limitless.",
  "Every day is a fresh start.",
  "You are capable of amazing things.",
];

const quote = document.getElementById("affirmation");
const newBtn = document.getElementById("new");
const copyBtn = document.getElementById("copy");

async function getAffirmation() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return data.affirmation;
  } catch {
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }
}

async function showAffirmation() {
  newBtn.disabled = true;
  quote.classList.add("fade");
  const [text] = await Promise.all([getAffirmation(), new Promise((r) => setTimeout(r, 300))]);
  quote.textContent = text;
  quote.classList.remove("fade");
  newBtn.disabled = false;
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(quote.textContent);
    copyBtn.textContent = "Copied!";
  } catch {
    copyBtn.textContent = "Couldn't copy";
  }
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

newBtn.addEventListener("click", showAffirmation);
showAffirmation();
