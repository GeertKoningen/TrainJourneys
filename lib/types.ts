export type JourneyParameters = {
  origin: string;
  destination: string;
  date: Date;
  nrOfPassengers: number;
};

export type Journeys = ReadonlyArray<Journey>;

export type Journey = {
  departure: Date;
  arrival: Date;
  price: Amount;
};

export type Amount = {
  value: number;
  currency: string;
};

export type JourneyRecord = {
  origin: string;
  destination: string;
  date: string;
  departure: string;
  arrival: string;
  price: number;
  currency: string;
};
