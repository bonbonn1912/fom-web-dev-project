
import React, { createContext, useState, useContext, ReactNode } from 'react';
import defaultProfilePicture from '../assets/defaultProfileIcon.png'


interface User {
    displayName: string;
    profilePicture: string;
    weight: string;
    ftp: string;
    restingHeartRate: string;
    maxHeartRate: string;
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>({
        displayName: "Test",
        profilePicture: defaultProfilePicture,
        weight: "",
        ftp: "",
        restingHeartRate: "",
        maxHeartRate: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
    {children}
    </UserContext.Provider>
);
};

export const useUser = () => useContext(UserContext);
