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

## Architecture

NextJS is implemented to divide the work over server and client

ESLint and Prettier are setup to maintain clean code.

Tailwind is used for styling

React-query / useQuery is used for it's retry-mechanism and to perfectly keep track of loading state.

Vitest and Playwright are used for testing.

## Data

The given data table is just example data. To make the application work, we need data in the future.

In order to make a representable list, I extended the data to an hourly train schedule for the three cities, starting from **24-08-2026 to 30-08-2026**.

In this application, train times generally start at 6:00 and end at 23:00

## Testing

Run the unittests:

```bash
npm test
```

Run the Playwright E2E Test:

```bash
npm run e2e
```

## Assumptions

**Time**

Time is essential for travelers. Though the assessment description doesn't mention time as a parameter for the search query. Time is left out; we'll show the times of the entire day.

**Passengers & API**

In this application, the number of passengers does not influence the result of the API. Though it's mentioned as one of the parameters so it's passed anyway. For real applications this would make it possible to show available seats in a ticket reservation system.
