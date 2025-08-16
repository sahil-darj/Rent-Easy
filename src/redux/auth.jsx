import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user,setUser]=useState("");
    const authorizationToken=`Bearer ${token}`;

    const storetokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    }   

    let isloggedIn = !!token;
    console.log(isloggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const userAuthentication = async (req, res) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization:authorizationToken
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUser(data);
            }else{
                // console.log(token);
                console.log("error");
            }
        } catch (error) {
            console.log("error in auth.js " + error);
        }
    }

    useEffect(() => {
        if (isloggedIn) {
            userAuthentication();
        }
    }, [isloggedIn]);

    return <AuthContext.Provider value={{ storetokenInLS, LogoutUser, isloggedIn , user , authorizationToken }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    return authContextValue;
}