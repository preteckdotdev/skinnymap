import fetch from "node-fetch"; // Ensure node-fetch is installed in your Node.js project

import * as dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Create the equivalent of __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the .env file from one folder above the current file
dotenv.config({ path: resolve(__dirname, "../../.env") });

interface WeatherData {
  snowfall: number;
  windSpeed: number;
}

export async function getWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const weatherApiKey = process.env.WEATHER_API_KEY;

  if (!weatherApiKey) {
    console.error("Missing WEATHER_API_KEY in .env file");
    return { snowfall: 0, windSpeed: 0 };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;

  try {
    console.log(url);
    const response = await fetch(url);
    const data: any = await response.json();
    console.log(`Weather API response:`, data);

    if (response.status !== 200 || !data.wind) {
      console.error(
        `Error fetching weather data: ${data.message || "Unknown error"}`
      );
      return { snowfall: 0, windSpeed: 0 }; // Default values
    }

    // Extract wind speed
    const windSpeed = data.wind.speed || 0;

    // Snowfall in the last hour (if available)
    const snowfall = data.snow?.["1h"] || 0; // Snowfall in mm

    return { snowfall, windSpeed };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { snowfall: 0, windSpeed: 0 }; // Default values in case of error
  }
}
