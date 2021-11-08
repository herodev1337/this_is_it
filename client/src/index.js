import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';


render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/quiz" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);