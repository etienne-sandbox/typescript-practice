import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Footer />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
