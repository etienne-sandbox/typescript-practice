import { useFectch } from "../hooks/useFetch";

export function App() {
  const places = useFectch("http://localhost:3001/places");
  const workouts = useFectch("http://localhost:3001/workouts");

  return <div className="App">Hello React</div>;
}
