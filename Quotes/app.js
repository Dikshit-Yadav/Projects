async function newQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        document.getElementById('quoteDisplay').innerText = data.content;
    } catch (error) {
        document.getElementById('quoteDisplay').innerText = 'Failed to fetch a new quote.';
        console.error('Error fetching quote:', error);
    }
}
