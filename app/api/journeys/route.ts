import { searchJourneys } from "@/lib/search-journeys";
import { parseJourneyParameters } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const journeyParameters = parseJourneyParameters(searchParams);

    if (!journeyParameters) {
      return new Response(JSON.stringify({ error: "Invalid journey parameters." }), {
        status: 400,
      });
    }

    const results = await searchJourneys(journeyParameters);

    if (results.length === 0) {
      return new Response(JSON.stringify([]), { status: 404 });
    }

    return new Response(JSON.stringify(results));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid journey request." }), { status: 400 });
  }
}
