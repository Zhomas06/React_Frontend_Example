
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Init from "./components/init";
import Config from "./components/list_config";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Init></Init>} />
        <Route
          path="/config"
          element={<Config></Config>}
        />
      </Routes>
    </Router>
  );
}

export default App;
