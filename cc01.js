const BASE_URL = `https://open.er-api.com/v6/latest`;//api to get latest currency exchange rates

// DOM Elements
const dropdowns = document.querySelectorAll(".dropdown select");//select both elements from and to currency dropdowns (it is a selector)
const btn = document.querySelector("form button");//btn: Selects the button inside the <form> using form button
const fromCurr = document.querySelector(".from select");//fromCurr and toCurr: Specifically target the "from" and "to" <select> elements within the form for easier reference.
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");//msg: Targets the <div> element that displays the exchange rate message using .msg

// Populate dropdowns with currency options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    // Update flag when currency is changed
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update exchange rate
const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        // Use the base currency (fromCurr.value) to get exchange rates
        const URL = `${BASE_URL}/${fromCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();

        // Check if data is successfully retrieved
        if (data.result === "success") {
            let rate = data.rates[toCurr.value];
            let finalAmount = (amtVal * rate).toFixed(2);
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        } else {
            msg.innerText = "Failed to retrieve exchange rate";
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        msg.innerText = "An error occurred. Please try again.";
    }
};

// Function to update country flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Handle button click to get exchange rate
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Initialize the page with default exchange rate
window.addEventListener("load", () => {
    updateExchangeRate();
});