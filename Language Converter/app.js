document.getElementById('translateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const targetLanguage = document.getElementById('languageSelect').value;

    // Example API endpoint (replace with your chosen API)
    const apiUrl = `https://api.example.com/translate?text=${encodeURIComponent(inputText)}&target=${targetLanguage}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById('outputText').innerText = data.translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('outputText').innerText = 'Translation failed.';
    }
});
