import type { JourneyParameters, Journeys } from "./types";
import { journeyData } from "./journey-data";
import { formatDateFilter, createDate } from "./format-utils";

type SearchJourneys = (parameters: JourneyParameters) => Promise<Journeys>;

export const searchJourneys: SearchJourneys = async ({ origin, destination, date }) => {
  // Search for journeys in journeyData
  const matches = journeyData.filter(
    (journey) =>
      journey.origin.toLowerCase() === origin.toLowerCase() &&
      journey.destination.toLowerCase() === destination.toLowerCase() &&
      journey.date === formatDateFilter(date)
  );

  if (matches.length === 0) {
    return [];
  }

  // Map to results
  return matches.map((journey) => ({
    departure: createDate(journey.date, journey.departure),
    arrival: createDate(journey.date, journey.arrival),
    price: {
      value: journey.price,
      currency: journey.currency,
    },
  }));
};
