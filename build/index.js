"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let reportJokes = []; // Array to store joke reports
let currentJoke = ""; // Current joke text
let currentScore = null; // Current score for the joke, initially null
// Fetch and display a new joke
function fetchNextJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://icanhazdadjoke.com", {
                headers: { 'Accept': 'application/json' }
            });
            const data = yield response.json();
            currentJoke = data.joke; // Store the joke text
            currentScore = null; // Reset the score for the new joke
            const jokeTextElement = document.getElementById("joke-text");
            jokeTextElement.innerText = currentJoke; // Display the joke
        }
        catch (error) {
            console.error("Error fetching joke:", error);
        }
    });
}
// Rate the current joke
function rateJoke(score) {
    currentScore = score;
    console.log(`Joke rated with score: ${score}`);
}
// Move to the next joke and store the current one in reportJokes
function saveJokeAndFetchNext() {
    if (currentJoke) {
        const jokeReport = {
            joke: currentJoke,
            score: currentScore,
            date: new Date().toISOString() // ISO format timestamp
        };
        // Add joke data to reportJokes array
        reportJokes.push(jokeReport);
        console.log("Updated reportJokes array:", reportJokes);
    }
    // Fetch a new joke after saving
    fetchNextJoke();
}
// Attach the save function to the "Next Joke" button
const nextJokeButton = document.getElementById("next-joke-btn");
nextJokeButton.addEventListener("click", saveJokeAndFetchNext);
// Initial joke fetch on page load
fetchNextJoke();
const apiKey = "7417f9abe4822c48ef9d2c0477eb05ba";
const city = "Barcelona"; // Change to desired city or use geolocation
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// Fetch weather data from OpenWeatherMap API
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(weatherUrl);
            if (!response.ok) {
                // Handle API errors
                const errorData = yield response.json();
                console.error("API Error:", errorData.message);
                return;
            }
            const data = yield response.json();
            if (data.main) {
                const { temp } = data.main;
                displayWeather(temp);
            }
            else {
                console.error("Error: Missing data in response.");
            }
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}
function displayWeather(temp) {
    const weatherElement = document.getElementById("weather");
    if (weatherElement) {
        weatherElement.innerHTML = `<p>${temp}°C</p>`;
    }
}
window.onload = () => {
    getWeather();
};
//# sourceMappingURL=index.js.map