import { createContext, useContext, useState } from "react";

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

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};
