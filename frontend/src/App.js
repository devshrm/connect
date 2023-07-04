import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import Login from "./components/login/LoginPage.js";
import Register from "./components/register/register.js";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
