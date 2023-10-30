import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import authUser from "../../Types/user";
import SetupUser from "../SetupUser/SetupUser";

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
  const [authUser, setAuthUser]  = useState<authUser>();
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/auth/status"); // Replace with your actual API endpoint
      const user = await response.json();
      console.log(authUser)

      if (user.auth === false) {
        setIsAuthenticated(false);
        setIsLoading(false);
      } else {
        setIsAuthenticated(user.auth);
        setAuthUser(user);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);   
  if (isLoading) {
    return <LoadingSpinner callFrom={"authConext"} width={64} height={64}/>;
  } 
  if(!isLoading && authUser == undefined) {
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
  if(!isLoading && authUser != undefined) {
    if(authUser.setup === false) {
      return <SetupUser />
    } else {
      return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
          {props.children}
        </AuthContext.Provider>
      );
    }
  }
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const authenticate = async () =>{
    const response = await fetch("/auth/status"); // Replace with your actual API endpoint
    const status = await response.json();
    return new Promise((resolve, reject) => {
        if(status.auth === false) {
            window.location.href = "/";
            reject(false);
        }else {
            resolve(true);
        }
    });
}

export { AuthProvider, useAuth, authenticate};
