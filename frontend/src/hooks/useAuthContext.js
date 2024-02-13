import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw Error('useAuthContext must be within the scope of the context provider');

    return context;
}