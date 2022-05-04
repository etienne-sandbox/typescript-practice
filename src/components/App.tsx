import { useFetch } from "../hooks/useFetch";

export function App() {
  const places = useFetch("http://localhost:3001/places");
  const workouts = useFetch("http://localhost:3001/workouts");

  return <div className="App">Hello React</div>;
}
