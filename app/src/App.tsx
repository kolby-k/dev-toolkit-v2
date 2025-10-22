import { Route, Routes } from "react-router";
import "./styles/App.css";
import Home from "./routes/Home";
import JsonFormatter from "./routes/tools/JsonFormatter";
import NotFound from "./routes/Not-Found";
import Tools from "./routes/tools/Tools";

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
