import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthenticationContext = createContext();

export default function AuthenticationProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checkLogin = async () => {
            try {
            const res = await fetch("https://lotto-backend-pfhh.onrender.com/login/auth/check", {
                credentials: "include"
            });
            if (res.ok) {
                setIsLoggedIn(true); 
            }
            } catch {
            setIsLoggedIn(false);
            }
        };
    checkLogin();
    }, [isLoggedIn]);

    const handleLogout = async () => {
        try {
            const config = {
                method: "POST",
                credentials: "include",
            }

            await fetch("https://lotto-backend-pfhh.onrender.com/login/user/logout", config)

            setIsLoggedIn(false)
            navigate("/")

        } catch (error) {
            console.error("Logout failer:", error)
        }
    }




    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    )
}
