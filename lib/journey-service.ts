import { Journey } from "./types";

const API_ENDPOINT = "/api/journeys";

export const getJourneys = async ({
  journeyParameters,
}: {
  journeyParameters: URLSearchParams;
}): Promise<Journey[]> => {
  const response = await fetch(`${API_ENDPOINT}?${journeyParameters.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new ApiError(`Failed to fetch journeys: ${response.status}`, response.status);
  }

  const data = await response.json();

  return data.map(mapJourney);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapJourney = (data: any): Journey => ({
  departure: new Date(data.departure),
  arrival: new Date(data.arrival),
  price: {
    value: data.price.value,
    currency: data.price.currency,
  },
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}
