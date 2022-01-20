import "./style.css";

const root = notNil(document.getElementById("app"));

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

const workoutsDisplay = createDisplay();

fetch("http://localhost:3001/workouts")
  .then((res) => res.json())
  .then((data: WorkoutResponse) => {
    workoutsDisplay(
      data.results
        .map(
          (workout) =>
            `${workout.date} - ${workout.distance}m ${workout.duration}mn`
        )
        .join("\n")
    );
  });

function createDisplay() {
  const elem = document.createElement("pre");
  root.appendChild(elem);
  return (content: string) => {
    elem.innerHTML = content;
  };
}

function notNil<T>(val: T | null | undefined): T {
  if (val === null || val === undefined) {
    throw new Error("Unexpected null or undefined");
  }
  return val;
}
