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

fetch("http://localhost:3001/workouts")
  .then((res) => res.json())
  .then((data) => {
    const workoutsResult = WorkoutResponseSchema.parse(data);
    workoutsDisplay.updateContent(
      workoutsResult.results
        .map(
          (workout) =>
            `${workout.date} - ${workout.distance}m ${workout.duration}mn`
        )
        .join("\n")
    );
  });

type Place = {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
};

type PlaceResponse = {
  results: Array<Place>;
  total: number;
};

const placesDisplay = createDisplay("Places");

fetch("http://localhost:3001/places")
  .then((res) => res.json())
  .then((data: PlaceResponse) => {
    placesDisplay.updateContent(
      data.results.map((place) => `${place.name} (${place.slug})`).join("\n")
    );
  });
