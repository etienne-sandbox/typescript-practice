import "./style.css";
import { createDisplay } from "./utils";

type Workout = {
  id: string;
  date: string;
  place: string;
  distance: number;
  duration: number;
  user: string;
  placeName: string;
  speed: number;
  userName: string;
};

type WorkoutResponse = {
  results: Array<Workout>;
  count: number;
};

const workoutsDisplay = createDisplay("Workouts");

fetch("http://localhost:3001/workouts")
  .then((res) => res.json())
  .then((data: WorkoutResponse) => {
    workoutsDisplay.updateContent(
      data.results
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
  count: number;
};

const placesDisplay = createDisplay("Places");

fetch("http://localhost:3001/places")
  .then((res) => res.json())
  .then((data: PlaceResponse) => {
    placesDisplay.updateContent(
      data.results.map((place) => `${place.name} (${place.slug})`).join("\n")
    );
  });
