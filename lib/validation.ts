// Validate:
// Origin (string, non-empty and required)
// Destination (string, non-empty and required)
// Travel date (date, non-empty and required, cannot be in the past)
// Number of passengers (number, minimum 1, maximum 10, required)

import { JourneyParameters } from "./types";

export function parseJourneyParameters(searchParams: URLSearchParams): JourneyParameters | null {
  const origin = searchParams.get("origin")?.trim();
  const destination = searchParams.get("destination")?.trim();
  const dateString = searchParams.get("date")?.trim();
  const nrOfPassengersString = searchParams.get("nrOfPassengers")?.trim();

  if (!origin || !destination || !dateString || !nrOfPassengersString) {
    return null;
  }

  const date = new Date(dateString);
  const nrOfPassengers = Number.parseInt(nrOfPassengersString, 10);

  if (Number.isNaN(date.getTime()) || date < new Date()) {
    return null;
  }

  if (Number.isNaN(nrOfPassengers) || nrOfPassengers < 1 || nrOfPassengers > 10) {
    return null;
  }

  return {
    origin,
    destination,
    date,
    nrOfPassengers,
  };
}
