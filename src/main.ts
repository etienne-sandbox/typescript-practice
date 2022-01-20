import "./style.css";
import { createDisplay } from "./utils";
import * as zod from "zod";

const WorkoutSchema = zod.object({
  id: zod.string(),
  date: zod.string(),
  place: zod.string(),
  distance: zod.number(),
  duration: zod.number(),
  user: zod.string(),
  placeName: zod.string(),
  speed: zod.number(),
  userName: zod.string(),
});

const WorkoutResponseSchema = zod.object({
  results: zod.array(WorkoutSchema),
  total: zod.number(),
});

const workoutsDisplay = createDisplay("Workouts");

fetchAndParse("http://localhost:3001/workouts", WorkoutResponseSchema).then(
  (workoutsResult) => {
    workoutsDisplay.updateContent(
      workoutsResult.results
        .map(
          (workout) =>
            `${workout.date} - ${workout.distance}m ${workout.duration}mn`
        )
        .join("\n")
    );
  }
);

const PlaceSchema = zod.object({
  image: zod.string(),
  name: zod.string(),
  slug: zod.string(),
  workoutCount: zod.number(),
});

const PlaceResponseSchema = zod.object({
  results: zod.array(PlaceSchema),
  total: zod.number(),
});

const placesDisplay = createDisplay("Places");

fetchAndParse("http://localhost:3001/places", PlaceResponseSchema).then(
  (placesResult) => {
    placesDisplay.updateContent(
      placesResult.results
        .map((place) => `${place.name} (${place.slug})`)
        .join("\n")
    );
  }
);

async function fetchAndParse<Data>(
  url: string,
  schema: zod.Schema<Data>
): Promise<Data> {
  const res = await fetch(url);
  const data = await res.json();
  return schema.parse(data);
}
