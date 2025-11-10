import { Route, Routes } from "react-router";
import "./styles/App.css";

import Home from "./routes/Home";
import NotFound from "./routes/Not-Found";
import Tools from "./routes/tools/Tools";

import JsonFormatter from "./routes/tools/JsonFormatter";
import CharacterCounter from "./routes/tools/CharacterCounter";
import APIKeyGenerator from "./routes/tools/APIKeyGenerator";
import ColorPicker from "./routes/tools/ColorPicker";

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/character-counter" element={<CharacterCounter />} />
        <Route path="/tools/api-key-generator" element={<APIKeyGenerator />} />
        <Route path="/tools/color-picker" element={<ColorPicker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
