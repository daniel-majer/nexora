import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { PageNotFound } from "./pages/PageNotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={PageNotFound}>
    <App />
  </ErrorBoundary>,
);
