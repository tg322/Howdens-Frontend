import { createContext, useContext, useCallback } from "react";
import FileUploadContainer from './FileUploadContainer';
import PortfolioName from './PortfolioName';
import "./newPortfolio.scss"
import { useState } from "react";
import SplitLine from "./SplitLine";

const NewPortfolioContext = createContext(undefined)
const NewPortfolioDispatch = createContext(undefined)

export const useNewPortfolioStateContext = () => {
    const ctx = useContext(NewPortfolioContext);
    if (ctx == undefined) throw new Error('useNewPortfolioStateContext must be used within an NewPortfolioProvider');
    return ctx;
};

export const useNewPortfolioDispatchContext = () => {
    const ctx = useContext(NewPortfolioDispatch);
    if (ctx == undefined) throw new Error('useNewPortfolioDispatchContext must be used within an NewPortfolioProvider')
    return ctx
}

export const NewPortfolio= () => {
    const[portfolioName, setPortfolioName] = useState('');
    const[nameFinished, setNameFinished] = useState(false);
    const[portfolioFiles, setPortfolioFiles] = useState([]);

    const onChangePortfolioName = useCallback((name)=>{
        setPortfolioName(name)
    },[setPortfolioName])

    const onSetNameFinished = useCallback((value)=>{
        if(portfolioName){
            setNameFinished(value)
        }
    },[portfolioName, setNameFinished])

    const onChangeFiles = useCallback((files)=>{
        const filesArray = Array.from(files)
        setPortfolioFiles(prev => [...prev, ...filesArray])
    },[setPortfolioFiles])

    return(
        <NewPortfolioContext.Provider value={{portfolioName, nameFinished, portfolioFiles}}>
            <NewPortfolioDispatch.Provider value={{onChangePortfolioName, onSetNameFinished, onChangeFiles}}>
                <div className="newPortfolioWrapper">
                    <PortfolioName/>
                    <SplitLine/>
                    <FileUploadContainer/>
                </div> 
            </NewPortfolioDispatch.Provider>
        </NewPortfolioContext.Provider>
        
    );
};