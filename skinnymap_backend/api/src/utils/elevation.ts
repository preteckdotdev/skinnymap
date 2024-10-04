import fetch from "node-fetch";

import * as dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Create the equivalent of __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the .env file from one folder above the current file
dotenv.config({ path: resolve(__dirname, "../../.env") });

export async function fetchElevations(
  inputPoints: Record<string, [number, number]>
): Promise<Record<string, number> | null> {
  const url = process.env.ELEVATION_API_URL;

  const pointsArray = Object.entries(inputPoints).map(([_, value]) => {
    return `${value[0]},${value[1]}`;
  });
  const pointsString = pointsArray.join("|");

  try {
    const response = await fetch(`${url}${pointsString}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch elevations: ${response.statusText}`);
    }

    const elevationResponse: any = await response.json();
    const elevationData = elevationResponse.results;

    const elevations = Object.keys(inputPoints).reduce((acc, key, index) => {
      acc[key] = Math.round(elevationData[index].elevation * 100) / 100; // Round to 2 decimal places
      return acc;
    }, {} as Record<string, number>);

    return elevations;
  } catch (error) {
    console.error("Error fetching elevation data:", error);
    return null;
  }
}
