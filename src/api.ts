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

export async function fetchPlaces(): Promise<PlacesResponse> {
  const res = await fetch("http://localhost:3001/places");
  if (!res.ok) {
    throw res;
  }
  return await res.json();
}

export async function fetchWorkouts(
  page: number = 0
): Promise<WorkoutsResponse> {
  const res = await fetch(`http://localhost:3001/workouts?offset=${page * 10}`);
  if (!res.ok) {
    throw res;
  }
  return await res.json();
}
