import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import {lazy, Suspense} from "react";
import "./App.css"; // Stile können mit TailwindCSS-Klassen angepasst werden
import Login from "./Pages/LandingPage/Login";
import Register from "./Pages/LandingPage/Register";
const NotFound = lazy(() => import("./Pages/NotFound/404"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
import { AuthProvider } from "./Pages/Auth/authContext";
import { UserProvider} from "./Context/UserContext.tsx";
import { QueryClient, QueryClientProvider} from "react-query";
import ProtectedWrapper from "./Pages/Auth/ProtectedRoute";
import Impressum from "./Pages/Impressum/Impressum.tsx";
const queryClient = new QueryClient();

const App = () => {
  // @ts-ignore
    return (
    <AuthProvider>
        <UserProvider>
            <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/impressum" element={<Impressum/>}></Route>
          <Route
            path="/"
            element={
              <ProtectedWrapper
                  authElement={<Navigate to="/dashboard" replace />}
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
                altElement={<Navigate to="/" replace />}
              />
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        </Suspense>
      </Router>
            </QueryClientProvider>
        </UserProvider>
    </AuthProvider>
  );
};

export default App;
