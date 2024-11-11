interface JokeReport {
    joke: string;
    score: number | null;
    date: string;
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
declare let reportJokes: JokeReport[];
declare let currentJoke: string;
declare let currentScore: number | null;
declare function fetchNextJoke(): Promise<void>;
declare function rateJoke(score: number): void;
declare function saveJokeAndFetchNext(): void;
declare const nextJokeButton: HTMLButtonElement;
declare const apiKey = "7417f9abe4822c48ef9d2c0477eb05ba";
declare const city = "Barcelona";
declare const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=7417f9abe4822c48ef9d2c0477eb05ba&units=metric";
declare function getWeather(): Promise<void>;
declare function displayWeather(temp: number): void;
