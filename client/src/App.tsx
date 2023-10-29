import {
    BrowserRouter as Router,
    Routes,
    Route,
     Link,
} from "react-router-dom";
import { lazy} from "react";
import "./App.css"; // Stile können mit TailwindCSS-Klassen angepasst werden
import Login from "./Pages/LandingPage/Login";
import Register from "./Pages/LandingPage/Register";
const NotFound = lazy(() => import("./Pages/NotFound/404"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
import { AuthProvider } from "./Pages/Auth/authContext";
import { UserProvider} from "./Context/UserContext.tsx";

import ProtectedWrapper from "./Pages/Auth/ProtectedRoute";

const App = () => {
  // @ts-ignore
    return (
    <AuthProvider>
        <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedWrapper
                authElement={<Link to="/dashboard" replace />}
                altElement={<Login/>}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedWrapper
                authElement={<Dashboard />}
                altElement={<Login/>}
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
