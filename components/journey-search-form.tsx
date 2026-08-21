"use client";

import { useRouter } from "next/navigation";

export default function JourneySearchForm({
  urlSearchParameters,
  onSubmit,
}: {
  urlSearchParameters?: URLSearchParams;
  onSubmit?: () => void;
}) {
  const router = useRouter();
  const origin = urlSearchParameters?.get("origin") || "";
  const destination = urlSearchParameters?.get("destination") || "";
  const date = urlSearchParameters?.get("date") || "";
  const nrOfPassengers = urlSearchParameters?.get("nrOfPassengers") || "";

  // Get URLSearchParams by form
  const getSearchParams = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formArray = Array.from(formData.entries()).map(([key, value]) => [key, String(value)]);
    return new URLSearchParams(formArray);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchParams = getSearchParams(event.currentTarget);

    // Set title, for the history of the browser.
    document.title = `Train journey ${searchParams.get("origin")} to ${searchParams.get("destination")} on ${searchParams.get("date")} for ${searchParams.get("nrOfPassengers")} passengers`;
    router.push(`/?${searchParams.toString()}`);

    onSubmit?.();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4">
        <label htmlFor="origin" className="sr-only">
          Origin
        </label>
        <input
          id="origin"
          name="origin"
          type="text"
          required
          defaultValue={origin}
          placeholder="Origin"
          autoComplete="off"
          className="rounded border border-gray-300 px-2 py-2 w-50"
        />
      </div>

      <div className="my-4">
        <label htmlFor="destination" className="sr-only">
          Destination
        </label>
        <input
          id="destination"
          name="destination"
          type="text"
          required
          defaultValue={destination}
          placeholder="Destination"
          autoComplete="off"
          className="rounded border border-gray-300 px-2 py-2 w-50"
        />
      </div>

      <div className="my-4">
        <label htmlFor="date" className="sr-only">
          Travel date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          min={today}
          defaultValue={date}
          className="rounded border border-gray-300 px-2 py-2 w-50"
        />
      </div>

      <div className="my-4">
        <label htmlFor="nrOfPassengers" className="sr-only">
          Number of passengers
        </label>
        <input
          id="nrOfPassengers"
          name="nrOfPassengers"
          type="number"
          required
          min={1}
          max={10}
          step={1}
          defaultValue={nrOfPassengers}
          placeholder="Number of passengers"
          className="rounded border border-gray-300 px-2 py-2 w-50"
        />
      </div>

      <div className="my-4">
        <button
          type="submit"
          className="rounded bg-primary px-8 py-2 text-white transition duration-300 hover:bg-focus hover:shadow-xl"
        >
          Search
        </button>
      </div>
    </form>
  );
}
