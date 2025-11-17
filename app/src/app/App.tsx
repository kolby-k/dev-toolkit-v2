import { Route, Routes } from "react-router";
import "../shared/styles/App.css";

import Home from "../routes/Home";
import NotFound from "../routes/NotFound";
import Tools from "../routes/Tools";
import { toolRoutes } from "../routes/tools.routes";

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
        {toolRoutes.map((t) => (
          <Route path={t.path} element={t.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
