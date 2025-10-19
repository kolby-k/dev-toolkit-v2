import { Route, Routes } from "react-router";
import "./styles/App.css";
import Home from "./routes/Home";
import JsonFormatter from "./routes/tool/JsonFormatter";
import NotFound from "./routes/Not-Found";

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool/json-formatter" element={<JsonFormatter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
