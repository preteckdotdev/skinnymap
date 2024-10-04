export function getWeatherData(): { snowfall: number; windSpeed: number } {
  const snowfall = 25; // e.g., 25 cm of snowfall
  const windSpeed = 35; // e.g., 35 km/h wind speed
  return { snowfall, windSpeed };
}
