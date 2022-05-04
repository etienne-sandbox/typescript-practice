import { useQuery } from "react-query";
import { fetchWorkouts } from "../api";

export function Footer() {
  const workoutsRes = useQuery(["workouts", 0], () => fetchWorkouts());

  return <footer>{workoutsRes.data?.total ?? "??"}</footer>;
}
