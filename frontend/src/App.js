import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
