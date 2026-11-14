const API_URL = "https://dummyjson.com/quotes/random";

const dateEl = document.getElementById("date");
const quoteCard = document.getElementById("quoteCard");
const quoteTextEl = document.getElementById("quoteText");
const quoteAuthorEl = document.getElementById("quoteAuthor");
const button = document.getElementById("newQuoteBtn");

function showToday() {
  const today = new Date();
  dateEl.textContent = today.toLocaleDateString("el-GR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  dateEl.dateTime = today.toISOString().slice(0, 10);
}

function renderQuote(quote, author) {
  quoteTextEl.textContent = quote;
  quoteAuthorEl.textContent = author;
}

async function loadQuote() {
  button.disabled = true;
  quoteCard.classList.add("is-loading");
  quoteCard.classList.remove("is-fresh");

  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data.quote !== "string" || typeof data.author !== "string") {
      throw new Error("Unexpected API response");
    }

    renderQuote(data.quote, data.author);

    // Restart the entrance animation for each new quote.
    void quoteCard.offsetWidth;
    quoteCard.classList.add("is-fresh");
  } catch (error) {
    renderQuote("Δεν ήταν δυνατή η φόρτωση του quote. Δοκιμάστε ξανά.", "");
    console.error("Quote request failed:", error);
  } finally {
    quoteCard.classList.remove("is-loading");
    button.disabled = false;
  }
}

button.addEventListener("click", loadQuote);

showToday();
loadQuote();
