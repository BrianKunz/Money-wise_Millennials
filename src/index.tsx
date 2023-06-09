import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

if (typeof window !== "undefined") {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("Cannot find 'root' element in the DOM.");
  }
}
