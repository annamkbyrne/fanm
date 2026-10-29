// /api/quote is proxied to https://zenquotes.io/api/random by netlify.toml (avoids CORS).
const API_URL = "/api/quote";

const FALLBACKS = [
  { q: "The journey of a thousand miles begins with one step.", a: "Lao Tzu" },
  { q: "What you think, you become.", a: "Buddha" },
  { q: "Act as if what you do makes a difference. It does.", a: "William James" },
  { q: "It always seems impossible until it's done.", a: "Nelson Mandela" },
  { q: "Well done is better than well said.", a: "Benjamin Franklin" },
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newBtn = document.getElementById("new");
const copyBtn = document.getElementById("copy");

async function getQuote() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const [data] = await res.json();
    // ZenQuotes returns a placeholder quote when rate-limited (5 requests per 30s)
    if (!data?.q || data.a === "zenquotes.io") throw new Error("rate limited");
    return data;
  } catch {
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }
}

async function showQuote() {
  newBtn.disabled = true;
  quote.classList.add("fade");
  author.classList.add("fade");
  const [data] = await Promise.all([getQuote(), new Promise((r) => setTimeout(r, 300))]);
  quote.textContent = data.q;
  author.textContent = `— ${data.a}`;
  quote.classList.remove("fade");
  author.classList.remove("fade");
  newBtn.disabled = false;
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(`"${quote.textContent}" ${author.textContent}`);
    copyBtn.textContent = "Copied!";
  } catch {
    copyBtn.textContent = "Couldn't copy";
  }
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

newBtn.addEventListener("click", showQuote);
showQuote();
