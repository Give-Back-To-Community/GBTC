import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Navbar from "./components/navbar/Navbar";
import Feed from "./components/feed/Feed";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/404/PageNotFound";
import Livestreams from "./pages/livestreams/Livestreams";
import Chat from "./components/chat/chat";
import SingleFeed from "./components/feed/SingleFeed";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/livestreams" element={<Livestreams />} />
          <Route path="/livestreams/room/:roomID" element={<Livestreams />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/feed/:url" element={<SingleFeed />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
