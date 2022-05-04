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
  const [places, refreshPlaces] = useFetch<PlacesResponse>(
    "http://localhost:3001/place"
  );
  const [workouts, refreshWorkouts] = useFetch<WorkoutsResponse>(
    "http://localhost:3001/workouts"
  );

  return (
    <div className="App">
      <div>
        <h2>
          Places <button onClick={refreshPlaces}>Refresh</button>
        </h2>
        {(() => {
          if (places.status === "error") {
            return <div>Error</div>;
          }
          if (places.status === "loading") {
            return <div>Loading...</div>;
          }
          return (
            <div>
              {places.data.results.map((place) => (
                <div key={place.slug}>{place.name}</div>
              ))}
            </div>
          );
        })()}
      </div>
      <div>
        <h2>
          Workouts <button onClick={refreshWorkouts}>Refresh</button>
        </h2>
        {(() => {
          if (workouts.status === "error") {
            return <div>Error</div>;
          }
          if (workouts.status === "loading") {
            return <div>Loading...</div>;
          }
          return (
            <div>
              {workouts.refreshing && <p>Updating...</p>}
              {workouts.data.results.map((workout) => (
                <div key={workout.id}>
                  {workout.distance}m - {workout.duration}min
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
