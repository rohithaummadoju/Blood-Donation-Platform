import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);

    const login = (userData, token) => {

        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify(userData));

        // Save user id separately
        localStorage.setItem("userId", userData._id || userData.id);

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};