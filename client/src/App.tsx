import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css"; // Stile können mit TailwindCSS-Klassen angepasst werden
import Login from "./Pages/LandingPage/Login";
import Register from "./Pages/LandingPage/Register";
import NotFound from "./Pages/NotFound/404";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./Pages/Auth/authContext";
import { UserProvider} from "./Context/UserContext.tsx";

import ProtectedWrapper from "./Pages/Auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
        <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedWrapper
                authElement={<Navigate to="/dashboard" replace />}
                altElement={<Login/>}
              />
            }
          />
            <Route
                path="/mymap"
                element={
                    <ProtectedWrapper
                        authElement={<Map/>}
                        altElement={<Navigate to="/" replace />}
                    />
                }
            />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedWrapper
                authElement={<Dashboard />}
                altElement={<Navigate to="/" replace />}
              />
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
        </UserProvider>
    </AuthProvider>
  );
};

export default App;
