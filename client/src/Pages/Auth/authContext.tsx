import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
interface props {
  children: React.ReactElement;
}
const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

const AuthProvider = (props: props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/auth/status"); // Replace with your actual API endpoint
      const status = await response.json();
      if (status.auth === false) {
        setIsAuthenticated(false);
        setIsLoading(false);
      } else {
        setIsAuthenticated(status.auth);
        setIsLoading(false);
      }
    }; 

    checkAuth();
  }, []);   
  if (isLoading) {
    return <LoadingSpinner width={64} height={64}/>;
  } else { 
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
