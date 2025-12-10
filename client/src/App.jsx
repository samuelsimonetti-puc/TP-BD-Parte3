import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Alocacoes from "./pages/Alocacoes";
import Aptidoes from "./pages/Aptidoes";
import "./App.css";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function LoginRoute() {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/alocacoes" replace />;
  }
  return <Login />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route
          path="/alocacoes"
          element={
            <ProtectedRoute>
              <Alocacoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptidoes"
          element={
            <ProtectedRoute>
              <Aptidoes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
