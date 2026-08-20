import { describe, expect, it } from "vitest";
import { parseJourneyParameters } from "../lib/validation";

describe("parseJourneyParameters", () => {
  it("parses valid journey parameters", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2026-08-25&nrOfPassengers=2"
    );

    expect(parseJourneyParameters(params)).toMatchObject({
      origin: "Hengelo",
      destination: "Enschede",
      date: new Date("2026-08-25"),
      nrOfPassengers: 2,
    });
  });

  it("returns invalid when origin is missing", () => {
    const params = new URLSearchParams("destination=Enschede&date=2026-08-25&nrOfPassengers=2");

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when destination is missing", () => {
    const params = new URLSearchParams("origin=Hengelo&date=2026-08-25&nrOfPassengers=2");

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when passengers is zero", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2026-08-25&nrOfPassengers=0"
    );

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when passengers is negative", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2026-08-25&nrOfPassengers=-1"
    );

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when passengers is too high", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2026-08-25&nrOfPassengers=11"
    );

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when date is missing", () => {
    const params = new URLSearchParams("origin=Hengelo&destination=Enschede&nrOfPassengers=2");

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when date is in the past", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2020-08-25&nrOfPassengers=2"
    );

    expect(parseJourneyParameters(params)).toBeNull();
  });

  it("returns invalid when date is invalid", () => {
    const params = new URLSearchParams(
      "origin=Hengelo&destination=Enschede&date=2026-13-32&nrOfPassengers=2"
    );

    expect(parseJourneyParameters(params)).toBeNull();
  });
});
