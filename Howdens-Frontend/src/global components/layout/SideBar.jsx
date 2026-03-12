import { createContext, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './layout.scss'

const SidebarContext = createContext(undefined)
const SidebarDispatch = createContext(undefined)

export const useSidebarStateContext = () => {
    const ctx = useContext(SidebarContext);
    if (ctx == undefined) throw new Error('useSidebarStateContext must be used within an SidebarProvider');
    return ctx;
};

export const useSidebarDispatchContext = () => {
    const ctx = useContext(SidebarDispatch);
    if (ctx == undefined) throw new Error('useSidebarDispatchContext must be used within an SidebarProvider')
    return ctx
}

export const SideBar = ({children}) => {
    
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const navigateTo = useCallback((path)=>{
        navigate(`${path}`)
    },[navigate])

    return(
        <SidebarContext.Provider value={{pathname}}>
            <SidebarDispatch.Provider value={{navigateTo}}>
                <div className="sideBar">
                    {children}
                </div>
            </SidebarDispatch.Provider>
        </SidebarContext.Provider>
        
    );
};