import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
