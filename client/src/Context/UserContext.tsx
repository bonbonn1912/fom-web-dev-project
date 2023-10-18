// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import defaultProfilePicture from '../assets/defaultProfileIcon.png'

// Definieren Sie die Struktur Ihres User-Objekts
interface User {
    displayName: string;
    profilePicture: string;
}

// Definieren Sie die Struktur des Kontextwerts
interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Erstellen Sie den Kontext mit einem Default-Wert
export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

// Erstellen Sie einen Provider, um den Kontext in Ihrem Baum verfügbar zu machen
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>({
        displayName: "Test",
        profilePicture: defaultProfilePicture,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
    {children}
    </UserContext.Provider>
);
};

// Ein Hook, um den Kontext einfacher zu verwenden
export const useUser = () => useContext(UserContext);
