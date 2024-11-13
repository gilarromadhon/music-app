"use client"

import { createContext, useState } from "react";

const defaultDarkModeContext = { 
    isDarkMode: false, 
    setIsDarkMode: () => {} 
};
const DarkModeContext = createContext<{ 
    isDarkMode: boolean; 
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> 
}>(defaultDarkModeContext);

const DarkModeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider
