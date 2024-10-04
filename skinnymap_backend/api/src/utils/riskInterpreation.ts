export function interpretRisk(risk: number): string {
  if (risk < 1.5) {
    return "Low";
  } else if (risk < 2.5) {
    return "Moderate";
  } else if (risk < 3.5) {
    return "Considerable";
  } else {
    return "High";
  }
}
