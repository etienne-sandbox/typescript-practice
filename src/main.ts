import "./style.css";
import { createDisplay, Display } from "./utils";
import * as zod from "zod";
import { createResource, Resource } from "./resource";

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

const workoutsDisplay = createDisplay("Workouts");
const placesDisplay = createDisplay("Places");

createResource(
  {
    url: "http://localhost:3001/workouts",
    schema: WorkoutResponseSchema,
  },
  (workoutsRes) => {
    updateDisplayFromResource(
      workoutsDisplay,
      workoutsRes,
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
  }
);

function updateDisplayFromResource<Data>(
  display: Display,
  resource: Resource<Data>,
  onSuccess: (data: Data) => void
) {
  if (resource.status === "pending") {
    display.updateContent("Loading...");
    return;
  }
  if (resource.status === "rejected") {
    display.updateContent("Error: " + String(resource.error));
    return;
  }
  onSuccess(resource.data);
}

createResource(
  {
    url: "http://localhost:3001/places",
    schema: PlaceResponseSchema,
  },
  (placesRes) => {
    updateDisplayFromResource(placesDisplay, placesRes, (placesResult) => {
      placesDisplay.updateContent(
        placesResult.results
          .map((place) => `${place.name} (${place.slug})`)
          .join("\n")
      );
    });
  }
);
