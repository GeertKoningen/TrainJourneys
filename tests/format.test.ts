import { describe, expect, it } from "vitest";
import {
  createDate,
  formatDateDisplay,
  formatDateFilter,
  formatDuration,
  formatPrice,
} from "@/lib/format-utils";

describe("format", () => {
  const locale = "nl-NL";

  it("formats the display date for the given locale", () => {
    const dateString = formatDateDisplay(new Date(2026, 7, 25), locale);
    expect(dateString).toBe("25-08-2026");
  });

  it("formats the duration correctly", () => {
    const dateString1 = formatDuration(new Date(2026, 7, 25, 10, 0), new Date(2026, 7, 25, 12, 30));
    const dateString2 = formatDuration(new Date(2026, 7, 25, 10, 0), new Date(2026, 7, 25, 10, 15));

    expect(dateString1).toMatch("2h 30m");
    expect(dateString2).toMatch("15m");
  });

  it("creates the date correctly", () => {
    const dateTime = createDate("25-08-2026", "10:30");
    expect(dateTime).toBeInstanceOf(Date);
    expect(dateTime.getFullYear()).toBe(2026);
    expect(dateTime.getMonth()).toBe(7);
    expect(dateTime.getDate()).toBe(25);
    expect(dateTime.getHours()).toBe(10);
    expect(dateTime.getMinutes()).toBe(30);
  });

  it("formats the price in EUR correctly", () => {
    const priceString = formatPrice(1234.56, "EUR", locale);
    const fixSpacePriceString = priceString.replace(/\u00a0/g, " ");
    expect(fixSpacePriceString).toBe("€ 1.234,56");
  });

  it("formats the price in USD correctly", () => {
    const priceString = formatPrice(1234.56, "USD", locale);
    const fixSpacePriceString = priceString.replace(/\u00a0/g, " ");
    expect(fixSpacePriceString).toBe("US$ 1.234,56");
  });
});
