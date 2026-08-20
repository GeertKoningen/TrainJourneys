This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ESLint and Prettier

ESLint and Prettier are setup to maintain clean code.

## Mock Data

To make the application work, we need data in the future.
In order to make a representable list, I extended the data to an hourly schedule for the three cities, starting from **24-08-2026 to 30-08-2026**.
In this application, train times generally start at 6:00 and end at 23:00

## Unit tests

To run the unittests tests/format.test.ts and tests/validation.test.ts run:

```bash
npm test
```

## Playwright E2E Test

To test the Playwright E2E Test in tests/playwright-e2e.test.tsx run:

```bash
npm run e2e
```
