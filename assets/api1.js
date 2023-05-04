const API_KEY = "6b869728c09a45668bf6346e34450b5a";
const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', event => {
    event.preventDefault();
    const fromCurrency = form.elements.fromCurrency.value.toUpperCase();
    const toCurrency = form.elements.toCurrency.value.toUpperCase();
    const amount = form.elements.amount.valueAsNumber;

    const url = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
                const convertedAmount = amount * exchangeRate;
                resultDiv.textContent = `${ amount } ${ fromCurrency } = ${ convertedAmount } ${ toCurrency }`;
            })
            .catch(error => {
                console.error(error);
                resultDiv.textContent = 'An error occurred. Please try again later.';
            });
});
