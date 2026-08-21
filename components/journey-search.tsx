"use client";
import QueryProvider from "./query-provider";
import { parseJourneyParameters } from "@/lib/validation";
import JourneyResults from "./journey-results";
import JourneySearchForm from "./journey-search-form";
import JourneyValues from "./journey-values";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [isChanging, setIsChanging] = useState(false);
  const hasMounted = useRef(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.toString();

  const urlParams = new URLSearchParams(searchQuery);
  const hasParams = urlParams.size > 0;

  const journeyParameters = hasParams ? parseJourneyParameters(urlParams) : null;

  const currentState: "initial" | "results" | "error" = !hasParams
    ? "initial"
    : journeyParameters
      ? "results"
      : "error";

  const handleChangeClick = () => {
    setIsChanging(true);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setIsChanging(false);
  }, [searchQuery]);

  if (currentState === "initial") {
    return <JourneySearchForm />;
  }

  return (
    <>
      <JourneyValues journeyParameters={journeyParameters} />

      {!journeyParameters && (
        <div className="my-4">
          Please provide valid journey parameters, with 1 - 10 passengers, and a correct date.
        </div>
      )}

      {!isChanging && (
        <div className="my-4">
          <button
            className="px-8 py-2 bg-primary text-white rounded transition duration-300 hover:bg-focus hover:shadow-xl"
            onClick={handleChangeClick}
          >
            Change
          </button>
        </div>
      )}

      {isChanging && (
        <JourneySearchForm urlSearchParameters={urlParams} onSubmit={() => setIsChanging(false)} />
      )}

      {currentState === "results" && (
        <QueryProvider>
          <JourneyResults searchQuery={searchQuery} />
        </QueryProvider>
      )}
    </>
  );
}
