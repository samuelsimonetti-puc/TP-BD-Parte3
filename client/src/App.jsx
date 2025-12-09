import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Alocacoes from "./pages/Alocacoes";
import Aptidoes from "./pages/Aptidoes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alocacoes" element={<Alocacoes />} />
        <Route path="/aptidoes" element={<Aptidoes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
