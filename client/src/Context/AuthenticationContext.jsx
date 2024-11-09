import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizeContext = createContext();

export const AuthenticationContext = ({ children }) => {

    const [userInfo, setUserInfo] = useState();

    return (
        <AuthorizeContext.Provider value={{ userInfo,setUserInfo }}>
            {children}
        </AuthorizeContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthorizeContext)
}
