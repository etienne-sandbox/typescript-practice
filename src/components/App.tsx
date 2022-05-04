import { useQuery } from "react-query";
import { fetchPlaces, fetchWorkouts } from "../api";
import { useState } from "react";

export function App() {
  const [page, setPage] = useState(0);

  const placesRes = useQuery(["places"], fetchPlaces, {
    retry: 1,
  });

  const workoutsRes = useQuery(["workouts", page], () => fetchWorkouts(page), {
    cacheTime: 10000,
    keepPreviousData: true,
  });

  return (
    <div className="App">
      <div>
        <h2>
          Workouts {workoutsRes.isFetching && <span>...</span>}
          <button onClick={() => workoutsRes.refetch()}>Refresh</button>
        </h2>
        {(() => {
          if (workoutsRes.isError) {
            return <div>Error</div>;
          }
          if (workoutsRes.isLoading) {
            return <div>Loading...</div>;
          }
          if (workoutsRes.data) {
            return (
              <div>
                {workoutsRes.data.results.map((workout) => (
                  <div key={workout.id}>
                    {workout.distance}m - {workout.duration}min
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })()}
        <button onClick={() => setPage((p) => p - 1)}>Prev Page</button>
        <button onClick={() => setPage((p) => p + 1)}>Next Page</button>
      </div>

      <div>
        <h2>
          Places <button onClick={() => placesRes.refetch()}>Refresh</button>
        </h2>
        {(() => {
          if (placesRes.isError) {
            return <div>Error</div>;
          }
          if (placesRes.isLoading) {
            return <div>Loading...</div>;
          }
          if (placesRes.data) {
            return (
              <div>
                {placesRes.data.results.map((place) => (
                  <div key={place.slug}>{place.name}</div>
                ))}
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}
