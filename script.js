const API_URL = 'https://icanhazdadjoke.com/';

async function generateJoke() {
    const jokeContainer = document.getElementById('jokeContainer');
    const generateBtn = document.getElementById('generateBtn');

    jokeContainer.innerHTML = '<p class="loading">Loading...</p>';
    generateBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'   
            }
        });

        if (!response.ok) {
            throw new Error('API error: ' + response.status);
        }

        const data = await response.json();

        if (!data || !data.joke) {
            throw new Error('No joke found');
        }

        jokeContainer.innerHTML = `
            <p class="joke-text">${data.joke}</p>
        `;
    } catch (error) {
        console.error(error);
        jokeContainer.innerHTML = `
            <p class="joke-text">Oops! Failed to load a joke. Try again.</p>
        `;
    } finally {
        generateBtn.disabled = false;
    }
}
