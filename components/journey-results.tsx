"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getJourneys } from "@/lib/journey-service";
import { Journey } from "@/lib/types";
import { formatTime, formatPrice, formatDuration } from "@/lib/format-utils";
import { parseJourneyParameters } from "@/lib/validation";
/* Fix line breaks */
type Props = {
  searchQuery: string;
};

export default function JourneyResults({ searchQuery }: Props) {
  const urlSearchParams = new URLSearchParams(searchQuery);
  const journeyParameters = parseJourneyParameters(urlSearchParams);
  const passengers = journeyParameters?.nrOfPassengers || 1;
  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journeys", searchQuery],
    queryFn: () => getJourneys({ journeyParameters: urlSearchParams }),
    enabled: Boolean(journeyParameters),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) {
        // Don't keep retrying if the API returns a 404.
        return false;
      }
      return failureCount < 3;
    },
  });

  return (
    journeyParameters && (
      <table>
        <caption className="sr-only">Train journey search results</caption>
        <thead>
          <tr>
            <th>Departure & arrival</th>
            <th>Duration</th>
            <th>Price</th>
            {passengers > 1 && <th>Total</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading && <ResultsLoadingMultipleRows passengers={passengers} />}
          {!isLoading && (isError || items.length === 0) && (
            <tr>
              <td aria-live="polite" colSpan={passengers > 1 ? 4 : 3}>
                No results found.
              </td>
            </tr>
          )}
          {items.map((item, index) => (
            <ResultRow key={`row-${index}`} item={item} passengers={passengers} />
          ))}
        </tbody>
      </table>
    )
  );
}

function ResultRow({ item, passengers }: { item: Journey; passengers: number }) {
  return (
    <tr>
      <td>
        {formatTime(item.departure)}
        <span className="text-muted mx-2">&rArr;</span>
        {formatTime(item.arrival)}
      </td>
      <td>{formatDuration(item.departure, item.arrival)}</td>
      <td>{formatPrice(item.price.value, item.price.currency)}</td>
      {passengers > 1 && <td>{formatPrice(item.price.value * passengers, item.price.currency)}</td>}
    </tr>
  );
}

function ResultsLoadingMultipleRows({ passengers }: { passengers: number }) {
  return (
    <>
      <ResultsLoadingRow passengers={passengers} />
      <ResultsLoadingRow passengers={passengers} />
      <ResultsLoadingRow passengers={passengers} />
    </>
  );
}

function ResultsLoadingRow({ passengers }: { passengers: number }) {
  return (
    <tr>
      <td>
        <Skeleton widthClassName="w-[100px]" />
      </td>
      <td>
        <Skeleton widthClassName="w-[50px]" />
      </td>
      <td>
        <Skeleton widthClassName="w-[70px]" />
      </td>
      {passengers > 1 && (
        <td>
          <Skeleton widthClassName="w-[70px]" />
        </td>
      )}
    </tr>
  );
}

function Skeleton({ widthClassName }: { widthClassName: string }) {
  return (
    <span className={`inline-block h-5 ${widthClassName} animate-pulse rounded bg-textcolor/20`} />
  );
}
