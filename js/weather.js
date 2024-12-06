// API configuration
const API_KEY = "b102e7265d47acee75756fd28b043a57"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// HTML selectors
const searchBtn = document.getElementById("search-btn");
const localBtn = document.getElementById("local-btn");
const cityInput = document.getElementById("city-input");
const weatherCard = document.getElementById("weather-card");
const forecastSection = document.getElementById("forecast");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const forecastContainer = document.getElementById("forecast");

// Display weather data on the card
const displayWeather = (data) => {
    console.log(data);
    initializeWeather((data.weather[0].icon).toLowerCase());

    // Populate weather details
    cityName.textContent = data.name;
    weatherDescription.textContent = `${data.weather[0].description} ${
        data.weather[0].main === "Clear" ? "☀️" : "☁️"
    }`;
    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`; // Kelvin to Celsius
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `🌬️ Wind: ${data.wind.speed} km/h`;
    weatherCard.classList.remove("hidden"); // Show the weather card
};

// Display forecast data for the upcoming days
const displayForecast = (forecastData) => {
    forecastContainer.innerHTML = ""; // Clear previous forecast data

    const today = new Date().toISOString().split("T")[0];
    const dailyForecasts = {};

    // Group forecasts by date
    forecastData.list.forEach((forecast) => {
        const date = new Date(forecast.dt_txt).toISOString().split("T")[0];
        if (date === today) return; // Skip today's forecast

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = { temps: [], descriptions: [], icons: [] };
        }
        dailyForecasts[date].temps.push(forecast.main.temp);
        dailyForecasts[date].descriptions.push(forecast.weather[0].description);
        dailyForecasts[date].icons.push(forecast.weather[0].icon);
    });

    // Limit to 5 unique forecasts
    const uniqueForecasts = Object.keys(dailyForecasts).slice(0, 5);
    uniqueForecasts.forEach((date) => {
        const temps = dailyForecasts[date].temps;
        const minTemp = Math.round(Math.min(...temps) - 273.15);
        const maxTemp = Math.round(Math.max(...temps) - 273.15);
        const description = dailyForecasts[date].descriptions[0];
        const icon = dailyForecasts[date].icons[0];
        const dayName = new Date(date).toLocaleDateString("fr-FR", { weekday: "short" });

        // Create forecast card
        forecastContainer.innerHTML += `
            <div class="flex-shrink-0 bg-indigo-600 p-4 rounded-lg text-center w-40">
              <p class="text-sm font-bold">${dayName}</p>
              <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" class="mx-auto my-2" />
              <p class="text-xs">${description}</p>
              <p class="text-sm">Min: ${minTemp}°C</p>
              <p class="text-sm">Max: ${maxTemp}°C</p>
            </div>`;
    });

    forecastContainer.parentElement.classList.remove("hidden"); // Show forecast section
};

// Fetch current weather and forecast by city name
const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&lang=fr`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);

        const forecastResponse = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&lang=fr`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
};

// Fetch weather and forecast based on user's location
const fetchLocalWeather = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=fr`
                );
                if (!response.ok) throw new Error("Location not found");
                const data = await response.json();
                displayWeather(data);

                const forecastResponse = await fetch(
                    `${FORECAST_URL}?q=${data.name}&appid=${API_KEY}&lang=fr`
                );
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData);
            } catch (error) {
                alert(error.message);
            }
        },
        () => {
            alert("Unable to fetch your location.");
        }
    );
};

// Event listeners for search and location buttons
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    else alert("Please enter a city!");
});

localBtn.addEventListener("click", fetchLocalWeather);

// Handle horizontal scrolling for forecast cards
leftBtn.addEventListener("click", () => {
    forecastContainer.scrollBy({ left: -150, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
    forecastContainer.scrollBy({ left: 150, behavior: "smooth" });
});

// Trigger search on Enter key press
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
        else alert("Please enter a city!");
    }
});

// Load default weather on page load
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");
    if (city) fetchWeather(city);
    else fetchLocalWeather();
};

// Initialize weather animations based on weather type
function initializeWeather(weatherType) {
    const elements = {
        rainCloud: document.getElementById("rain-cloud"),
        snowCloud: document.getElementById("snow-cloud"),
        sunny: document.getElementById("sunny"),
    };

    Object.values(elements).forEach((element) => element.classList.add("hidden"));
    clearInterval(window.weatherInterval);

    const weatherConfig = {
        '01d': () => elements.sunny.classList.remove('hidden'),
        '01n': () => elements.sunny.classList.remove('hidden'),
        '02d': () => { elements.sunny.classList.remove('hidden'); elements.snowCloud.classList.remove('hidden'); },
        '02n': () => { elements.sunny.classList.remove('hidden'); elements.snowCloud.classList.remove('hidden'); },
        '03d': () => elements.snowCloud.classList.remove('hidden'),
        '03n': () => elements.snowCloud.classList.remove('hidden'),
        '04d': () => elements.rainCloud.classList.remove('hidden'),
        '04n': () => elements.rainCloud.classList.remove('hidden'),
        '09d': () => { elements.rainCloud.classList.remove('hidden'); startCloudAnimation('gray', 2000); },
        '09n': () => { elements.rainCloud.classList.remove('hidden'); startCloudAnimation('gray', 2000); },
        '10d': () => { elements.sunny.classList.remove('hidden'); elements.rainCloud.classList.remove('hidden'); startCloudAnimation('gray', 2000); },
        '10n': () => { elements.sunny.classList.remove('hidden'); elements.rainCloud.classList.remove('hidden'); startCloudAnimation('gray', 2000); },
        '11d': () => console.log('thunderstorm'),
        '11n': () => console.log('thunderstorm'),
        '13d': () => { elements.snowCloud.classList.remove('hidden'); startCloudAnimation('white', 2000, '❆'); },
        '13n': () => { elements.snowCloud.classList.remove('hidden'); startCloudAnimation('white', 2000, '❆'); },
        '50d': () => console.log('mist'),
        '50n': () => console.log('mist')
    };

    (weatherConfig[weatherType] || (() => console.log("No matching animation")) )();
}

// Create and animate weather effects (e.g., clouds, snow)
function startCloudAnimation(color, intervalTime, symbol = "|") {
    window.weatherInterval = setInterval(() => createElement(`.cloud-${color}`, symbol, `text-${color}`, intervalTime), 20);
}

function createElement(cloudSelector, text, colorClass, lifetime) {
    const cloud = document.querySelector(cloudSelector);
    const element = document.createElement("div");
    const left = Math.random() * 310;
    const size = 0.5 + Math.random() * 1.5;
    const duration = 1 + Math.random();

    element.classList.add("down-text", colorClass);
    element.style.left = `${left}px`;
    element.style.fontSize = `${size}em`;
    element.style.animationDuration = `${duration}s`;
    element.innerText = text;

    cloud.appendChild(element);

    setTimeout(() => cloud.removeChild(element), lifetime);
}
