import { formatDateDisplay } from "@/lib/format-utils";
import { parseJourneyParameters } from "@/lib/validation";

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
      {formatDateDisplay(journeyParameters.date)}
      {journeyParameters.nrOfPassengers > 1 && (
        <>
          <span className="text-muted mr-2">, </span>
          {journeyParameters.nrOfPassengers}
          <span className="text-muted mr-2"> passengers</span>
        </>
      )}
    </div>
  ) : null;
}
