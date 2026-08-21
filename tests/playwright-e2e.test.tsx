import { expect, test } from "@playwright/test";
/* Fix line breaks */
test("user can search for a journey and change the search", async ({ page }) => {
  // Open the page showing the form
  await page.goto("/");

  // Fill out the form
  await page.getByLabel("Origin").fill("Hengelo");
  await page.getByLabel("Destination").fill("Almelo");
  await page.getByLabel("Travel date").fill("2026-08-25");
  await page.getByLabel("Number of passengers").fill("2");
  await page.getByRole("button", { name: /search/i }).click();

  // Check for the right text
  await expect(page.getByText("Hengelo")).toBeVisible();
  await expect(page.getByText("Almelo")).toBeVisible();

  // Check for the table with results
  await expect(page.getByText("Departure & arrival")).toBeVisible();

  // Click change
  await page.getByRole("button", { name: "Change" }).click();

  // Check form
  await expect(page.getByLabel("Origin")).toHaveValue("Hengelo");
  await expect(page.getByLabel("Destination")).toHaveValue("Almelo");
});

test("get 'no results' message when no journeys are found", async ({ page }) => {
  // Open the page showing the form
  await page.goto("/");

  // Fill out the form
  await page.getByLabel("Origin").fill("Hengelo");
  await page.getByLabel("Destination").fill("Almelo");
  await page.getByLabel("Travel date").fill("2050-01-01");
  await page.getByLabel("Number of passengers").fill("2");
  await page.getByRole("button", { name: /search/i }).click();

  // Check for the 'no results' message
  await expect(page.getByText("No results found")).toBeVisible();
});
