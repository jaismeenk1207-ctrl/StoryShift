import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NovelLibrary from "./pages/NovelLibrary";
import MovieInput from "./pages/MovieInput";
import Reader from "./pages/Reader";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/novels" element={<NovelLibrary />} />

        <Route path="/movie" element={<MovieInput />} />
        
        <Route path="/read" element={<Reader />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;