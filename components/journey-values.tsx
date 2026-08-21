import { formatDateDisplay } from "@/lib/format-utils";
import { parseJourneyParameters } from "@/lib/validation";
import { useState, useEffect } from "react";
/* Fix line breaks */
export default function JourneyValues({
  journeyParameters,
}: {
  journeyParameters: ReturnType<typeof parseJourneyParameters> | null;
}) {
  return journeyParameters ? (
    <div className="my-4">
      {journeyParameters.origin}
      <span className="text-muted mx-2">&rArr;</span>
      {journeyParameters.destination}
      <span className="text-muted mr-2">, at</span>
      <Date date={journeyParameters.date} />

      {journeyParameters.nrOfPassengers > 1 && (
        <>
          <span className="text-muted mr-2">, </span>
          {journeyParameters.nrOfPassengers}
          <span className="text-muted mr-2"> passengers</span>
        </>
      )}
    </div>
  ) : null;

  // Avoid NextJS Hydration error by rendering the date clientside with useEffect.
  function Date({ date }: { date: Date }) {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
      setFormattedDate(formatDateDisplay(date));
    }, [date]);

    return <>{formattedDate}</>;
  }
}
