import express, { Request, Response } from "express";
import calcAvalancheRisk from "./utils/calcAvalancheRisk.js";

const SERVER = express();

SERVER.get("/getAvalancheRisk", async (req: Request, res: Response) => {
  // Extract and type latitude and longitude from the query string
  const { latitude, longitude } = req.query as {
    latitude?: string;
    longitude?: string;
  };

  // Convert latitude and longitude from string to float
  const LAT = latitude ? parseFloat(latitude) : undefined;
  const LON = longitude ? parseFloat(longitude) : undefined;

  // Handle case where LAT or LON is undefined
  if (LAT === undefined || LON === undefined) {
    // Return a 400 error with a message
    res
      .status(400)
      .send("Latitude and longitude must be provided as valid numbers.");
    return;
  }

  const DELTA = 0.001;

  // Define POINTS with exact tuples [number, number]
  const POINTS: Record<string, [number, number]> = {
    center: [LAT, LON],
    north: [LAT + DELTA, LON],
    south: [LAT - DELTA, LON],
    east: [LAT, LON + DELTA],
    west: [LAT, LON - DELTA],
  };

  // Log the POINTS for debugging purposes
  console.log(POINTS);

  calcAvalancheRisk(POINTS);

  // Send a response
  res.send("Hello, welcome to getAvalancheRisk!");
});

const PORT = process.env.PORT || 3000;
SERVER.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
