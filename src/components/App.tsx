import { useFetch } from "../hooks/useFetch";

type Place = {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
};

type PlacesResponse = {
  results: Place[];
  total: number;
};

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

type WorkoutsResponse = {
  results: Workout[];
  total: number;
};

export function App() {
  const places = useFetch<PlacesResponse>("http://localhost:3001/places");
  const workouts = useFetch<WorkoutsResponse>("http://localhost:3001/workouts");

  return (
    <div className="App">
      <div>
        <h2>Places</h2>
        {places === null ? (
          <p>Loading...</p>
        ) : (
          places.results.map((place) => (
            <div key={place.slug}>{place.name}</div>
          ))
        )}
      </div>
      <div>
        <h2>Workouts</h2>
        {workouts === null ? (
          <p>Loading...</p>
        ) : (
          workouts.results.map((workout) => (
            <div key={workout.id}>
              {workout.distance}m - {workout.duration}min
            </div>
          ))
        )}
      </div>
    </div>
  );
}
