import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Knowledge from "./routes/Knowledge";
import Admin from "./routes/Admin";

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/admin" element={<Admin />} />
    </Routes>
    <Routes>
    {/* <Route exact path="/quiz" element={<Quiz />} /> */}
    <Route exact path="knowledge" element={<Knowledge />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);