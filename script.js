const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const quoteBox = document.querySelector('.quote-box');

// Function to fetch a new quote
async function getNewQuote() {
  try {
    // Disable button and add loading state
    newQuoteBtn.disabled = true;
    quoteBox.classList.add('loading');
    
    // Fetch quote from API
    const response = await fetch('https://dummyjson.com/quotes/random');
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    
    // Update the quote and author
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `— ${data.author}`;
    
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Οops! Something went wrong. Please try again.';
    quoteAuthor.textContent = '';
  } finally {
    // Re-enable button and remove loading state
    newQuoteBtn.disabled = false;
    quoteBox.classList.remove('loading');
  }
}

// Event listener for the button
newQuoteBtn.addEventListener('click', getNewQuote);

// Load a quote when the page loads
window.addEventListener('load', getNewQuote);
