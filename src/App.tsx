import Home from "./pages/Home/Home";
import { PreviewProvider } from "./contexts/HomeContext";

export default function App() {
  return (
    <PreviewProvider>
      <Home />
    </PreviewProvider>
  );
}
