import { createContext, useContext, useCallback, useReducer, useEffect } from "react";
import { Utilities } from "../../services/utilities";
import { HomeContextReducer, initialHomeContextReducer } from "./HomeReducer";

const HomeContextState = createContext(undefined)

export const useHomeStateContext = () => {
    const ctx = useContext(HomeContextState);
    if (ctx == undefined) throw new Error('useHomeStateContext must be used within an HomeProvider');
    return ctx;
};

export const HomeContext = ({children}) => {

    const [state, dispatch] = useReducer(
        HomeContextReducer,
        initialHomeContextReducer
    );

    const utilities = new Utilities();

    const initialiseContext = useCallback(async()=>{
        dispatch({type:"INIT"})
        const response = await utilities.get_all_portfolios();

        dispatch({type:"INIT_SUCCESS", payload:response})

    },[utilities])

    useEffect(()=>{
        initialiseContext();
    },[])

    return(
        <HomeContextState.Provider value={{state}}>
                {children}  
        </HomeContextState.Provider>
        
    );
};