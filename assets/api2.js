const apiUrl = 'https://api.chucknorris.io/jokes/random';
const jokeText = document.getElementById('joke-text');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

        }
        return response.json();
    })
    .then(data => {
        const joke = data.value;
        jokeText.textContent = joke;
        console.log(joke);
    })
    .catch(error => {
        console.error('Error fetching Chuck Norris joke:', error);
        jokeText.textContent = 'Error fetching joke.';
    });

        }
        return response.json();
    })
    .then(data => {
        const joke = data.value;
        jokeText.textContent = joke;
        console.log(joke);
    })
    .catch(error => {
        console.error('Error fetching Chuck Norris joke:', error);
        jokeText.textContent = 'Error fetching joke.';
    });