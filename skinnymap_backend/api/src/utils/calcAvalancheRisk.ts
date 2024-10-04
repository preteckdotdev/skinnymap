import { fetchElevations } from "./elevation.js";
import { calculateSlopeAndAspect } from "./slopeAspect.js";
import { calculateAvalancheRisk } from "./riskCalculation.js";
import { getWeatherData } from "./weather.js";
import { interpretRisk } from "./riskInterpreation.js";

export default async function calcAvalancheRisk(
  inputPoints: Record<string, [number, number]>
) {
  // Fetch elevations
  const elevations = await fetchElevations(inputPoints);
  if (!elevations) {
    console.error("Failed to retrieve elevation data.");
    return;
  }

  // Calculate slope and aspect
  const { slopeAngle, aspectDirection } = calculateSlopeAndAspect(elevations);

  // Get dummy weather data
  const { snowfall, windSpeed } = getWeatherData();

  // Calculate avalanche risk
  const groupSize = 4; // Example: assume group size of 4
  const avalancheRisk = calculateAvalancheRisk(
    slopeAngle,
    aspectDirection,
    snowfall,
    windSpeed,
    groupSize
  );

  // Interpret risk level
  const riskLevel = interpretRisk(avalancheRisk);

  // Log results
  console.log({
    slopeAngle,
    aspectDirection,
    avalancheRisk,
    riskLevel,
  });
}
