export function calculateAvalancheRisk(
  slopeAngle: number,
  aspect: string,
  snowfall: number,
  windSpeed: number,
  groupSize: number
): number {
  const slopeFactor = slopeAngle > 30 ? 1.5 : 1;
  const aspectFactor = aspect === "north" || aspect === "east" ? 1.3 : 1;
  const weatherFactor = snowfall > 20 ? 1.5 : 1;
  const windFactor = windSpeed > 30 ? 1.4 : 1;
  const reductionFactor = groupSize <= 4 ? 0.9 : 1.2;

  return (
    slopeFactor * aspectFactor * weatherFactor * windFactor * reductionFactor
  );
}
