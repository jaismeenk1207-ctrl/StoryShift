import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieInput from "./pages/MovieInput";
import NovelLibrary from "./pages/NovelLibrary";
import Reader from "./pages/Reader";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<MovieInput />} />
      <Route path="/novels" element={<NovelLibrary />} />
      <Route path="/reader" element={<Reader />} />
    </Routes>
  );
}

export default App;