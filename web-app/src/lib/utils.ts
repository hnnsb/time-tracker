/**
 * Convert a duration in milliseconds to a string in the format HH:MM:SS
 * @param duration
 * @returns string in the format HH:MM:SS
 */
export function timeAsString(duration: number): string {
  const absDuration = Math.abs(duration);
  const seconds = Math.floor(absDuration / 1000) % 60;
  const minutes = Math.floor(absDuration / (1000 * 60)) % 60;
  const hours = Math.floor(absDuration / (1000 * 60 * 60));

  return `${duration < 0 ? "-" : ""}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
