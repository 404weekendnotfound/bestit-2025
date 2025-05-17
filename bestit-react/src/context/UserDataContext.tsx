import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
type UserDataContextType = {
    userData: any;
    setUserData: (data: any) => void;
    logout: () => void;
};

const UserDataContext = createContext<UserDataContextType>({
    userData: null,
    setUserData: () => {},
    logout: () => {}
});

export const useUserData = () => {
    return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        console.log("userData");
        console.log(userData);
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);


    const logout = () => {
        localStorage.removeItem("userData");
        setUserData(null);
        window.location.href = "/login";
    }

    return (
        <UserDataContext.Provider value={{ userData, setUserData, logout }}>
            {children}
        </UserDataContext.Provider>
    );
};
