import { createContext, useContext, useState, useEffect } from "react";

type UserDataContextType = {
    userData: any;
    setUserData: (data: any) => void;
};

const UserDataContext = createContext<UserDataContextType>({
    userData: null,
    setUserData: () => {}
});

export const useUserData = () => {
    return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};
