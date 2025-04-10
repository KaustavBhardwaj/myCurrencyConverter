const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const apiUrl = `https://open.er-api.com/v6/latest/USD`; // Base currency is USD

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');

    // Fetch currency rates
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });
        })
        .catch(error => console.error('Error fetching currency rates:', error));

    document.getElementById('converter-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error converting currency:', error);
                resultDiv.textContent = 'Error converting currency. Please try again.';
            });
    });
});
