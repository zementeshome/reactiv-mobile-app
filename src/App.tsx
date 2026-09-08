import * as React from "react";
import Home from "./pages/Home/Home";
import { PreviewProvider } from "./Contexts/HomeContext";

export default function App() {
  return (
    <PreviewProvider>
      <Home />
    </PreviewProvider>
  );
}
