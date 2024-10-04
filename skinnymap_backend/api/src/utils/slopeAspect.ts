export function calculateSlopeAndAspect(elevations: Record<string, number>): {
  slopeAngle: number;
  aspectDirection: string;
} {
  const delta = 0.001; // Approx ~111 meters
  const metersPerDegree = 111000;

  // Calculate slopes in x (east-west) and y (north-south) directions
  const dzDx =
    (elevations.east - elevations.west) / (2 * delta * metersPerDegree);
  const dzDy =
    (elevations.north - elevations.south) / (2 * delta * metersPerDegree);

  // Calculate slope angle in degrees
  const slopeAngleRad = Math.atan(Math.sqrt(dzDx ** 2 + dzDy ** 2));
  const slopeAngle = slopeAngleRad * (180 / Math.PI); // Convert radians to degrees

  // Calculate aspect angle in degrees
  const aspectRad = Math.atan2(dzDy, -dzDx);
  const aspect = (aspectRad * (180 / Math.PI) + 360) % 360; // Normalize to 0-360

  // Determine aspect direction
  let aspectDirection;
  if ((aspect >= 0 && aspect < 45) || (aspect >= 315 && aspect <= 360)) {
    aspectDirection = "north";
  } else if (aspect >= 45 && aspect < 135) {
    aspectDirection = "east";
  } else if (aspect >= 135 && aspect < 225) {
    aspectDirection = "south";
  } else {
    aspectDirection = "west";
  }

  return { slopeAngle: Math.round(slopeAngle * 100) / 100, aspectDirection };
}
