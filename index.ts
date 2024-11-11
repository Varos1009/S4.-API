// Define the structure for each joke report
interface JokeReport {
  joke: string;
  score: number | null; // Score can be null if no rating is given
  date: string; // ISO string format
}
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
}

let reportJokes: JokeReport[] = []; // Array to store joke reports
let currentJoke: string = ""; // Current joke text
let currentScore: number | null = null; // Current score for the joke, initially null

// Fetch and display a new joke
async function fetchNextJoke(): Promise<void> {
  try {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    currentJoke = data.joke; // Store the joke text
    currentScore = null; // Reset the score for the new joke
    const jokeTextElement = document.getElementById("joke-text") as HTMLParagraphElement;
    jokeTextElement.innerText = currentJoke; // Display the joke
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

// Rate the current joke
function rateJoke(score: number): void {
  currentScore = score;
  console.log(`Joke rated with score: ${score}`);
}

// Move to the next joke and store the current one in reportJokes
function saveJokeAndFetchNext(): void {
  if (currentJoke) {
    const jokeReport: JokeReport = {
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
const nextJokeButton = document.getElementById("next-joke-btn") as HTMLButtonElement;
nextJokeButton.addEventListener("click", saveJokeAndFetchNext);

// Initial joke fetch on page load
fetchNextJoke();
const apiKey = "7417f9abe4822c48ef9d2c0477eb05ba";
const city = "Barcelona"; // Change to desired city or use geolocation
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Fetch weather data from OpenWeatherMap API
async function getWeather(): Promise<void> {
  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      // Handle API errors
      const errorData = await response.json();
      console.error("API Error:", errorData.message);
      return;
    }

    const data: WeatherData = await response.json();
    if (data.main) {
      const { temp} = data.main;
      displayWeather(temp);
    } else {
      console.error("Error: Missing data in response.");
    }

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(temp: number): void {
  const weatherElement = document.getElementById("weather");
  if (weatherElement) {
    weatherElement.innerHTML = `<p>${temp}°C</p>`;
  }
}

window.onload = () => {
  getWeather();
};