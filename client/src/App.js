import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Navbar from "./components/navbar/Navbar";
import Feed from "./components/feed/Feed";
import "./App.css";
// import ImageSlider from "./pages/home/ImageSlider";
// import Community from "./pages/home/Community";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
