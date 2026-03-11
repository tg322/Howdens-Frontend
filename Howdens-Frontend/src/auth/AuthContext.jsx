import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Utilities } from "../services/utilities";

const AuthContext = createContext(undefined)
const AuthDispatch = createContext(undefined)

export const useAuthStateContext = () => {
    const ctx = useContext(AuthContext);
    if (ctx == undefined) throw new Error('useAuthStateContext must be used within an AuthProvider');
    return ctx;
};

export const useAuthDispatchContext = () => {
    const ctx = useContext(AuthDispatch);
    if (ctx == undefined) throw new Error('useAuthDispatchContext must be used within an AuthProvider')
    return ctx
}

export const Auth = ({children}) => {

    // User details: null = loading, false = nothing/failed, or UsersDetails array from API
    const[userDetails, setUserDetails] = useState(null);
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const utilities = new Utilities();
    // useEffect here to check if session already exists, if it does, set userDetails, otherwise set it as false.
    useEffect(()=>{
        if(userDetails == null){
            const storedUserDetails = sessionStorage.getItem('userDetails');
            const userDetailsResult = storedUserDetails ? JSON.parse(storedUserDetails) : false;

            setUserDetails(userDetailsResult);
        }
    },[userDetails])

    // useCallback to prevent re-renders and creating a new function each time, only recreate when dependencies change.
    const login = useCallback(async (loginFormData)=>{
        //Set loading state so login components can react
        setLoading(true)
        //Send form data to api
        const response = await utilities.login(loginFormData)

        //If error was returned, set error and set loading to false so user can interact with login form again
        if(response.error){
            setError(response.error)
            setLoading(false)
        }//else login was successful, set userDetails, add to session storage, wipe error and set loading to false 
        else{
            setUserDetails(response)
            sessionStorage.setItem('userDetails', JSON.stringify(response));
            setError('')
            setLoading(false)
        }
    },[userDetails, setUserDetails])

    //clear login states
    const logout = useCallback(()=>{
        setUserDetails(false)
        sessionStorage.setItem('userDetails', false);
    }, [setUserDetails])

    return(
        <AuthContext.Provider value={{userDetails, error, loading}}>
            <AuthDispatch.Provider value={{login, logout}}>
                {children}
            </AuthDispatch.Provider>
        </AuthContext.Provider>
        
    );
};