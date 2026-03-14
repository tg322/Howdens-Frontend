import { createContext, useContext, useCallback, useReducer, useEffect } from "react";
import FileUploadContainer from './FileUploadContainer';
import PortfolioName from './PortfolioName';
import "./newPortfolio.scss"
import { useState } from "react";
import SplitLine from "./SplitLine";
import { initialNewPortfolioContextReducer, NewPortfolioContextReducer } from "./NewPortfolioReducer";
import { Helpers } from "../../services/helpers";
import Finalise from "./Finalise";

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
    
    const [state, dispatch] = useReducer(
        NewPortfolioContextReducer,
        initialNewPortfolioContextReducer
    );

    const helpers = new Helpers();

    const onChangePortfolioName = useCallback((name)=>{
        dispatch({type:"SET_PORTFOLIO_NAME", payload:name})
    },[])

    const onSetNameFinished = useCallback((value)=>{
        if(state.portfolioName){
            dispatch({type:"SET_NAME_FINISHED", payload:value})
        }
    },[state.portfolioName])

    const onChangeFiles = useCallback(async (files)=>{
        const filesArray = Array.from(files)
        const tooLarge = filesArray.find((file) => file.size > 2097152)

        if(tooLarge){
            dispatch({type:"SET_OVER_FILE_SIZE", payload:true})
        }
        else if(files.length > 2 || (state.portfolioFiles.length + filesArray.length) > 2){
            dispatch({type:"SET_OVER_FILE_COUNT", payload:true})
        }else{
            const preparedFiles = await helpers.prepareFiles(filesArray);
            dispatch({type:"SET_PORTFOLIO_FILES", payload:[...state.portfolioFiles, ...preparedFiles]})
        }
    },[state.portfolioFiles])

    const deleteFile = useCallback((index)=>{
        const currentFiles = [...state.portfolioFiles];
        currentFiles.splice(index, 1);

        dispatch({type:"SET_PORTFOLIO_FILES", payload:currentFiles})
    },[state.portfolioFiles])

    const onSetFilesFinished = useCallback((value)=>{
        if(state.portfolioFiles.length === 2){
            dispatch({type:"SET_FILES_FINISHED", payload:value})
        }
    },[state.portfolioFiles])

    const handleProcessRowUpdate = useCallback((newRow, fileIndex, fileName) => {

        let validatedRow = newRow;

        if(fileName === "Test_Acc.csv"){
            validatedRow = helpers.validateACC(newRow, newRow.id)
        }else if(fileName === "Test_Loc.csv"){
            validatedRow = helpers.validateLOC(newRow, newRow.id)
        }


        const updatedFiles = state.portfolioFiles.map((file, index) => {
            if (index !== fileIndex) {
                return file;
            }

            return {
                ...file,
                file: file.file.map((row) =>
                    row.id === newRow.id ? validatedRow : row
                )
            };
        });

        dispatch({type:"SET_PORTFOLIO_FILES", payload:updatedFiles})

        return validatedRow;
    }, [state.portfolioFiles]);

    useEffect(()=>{console.log(state.portfolioFiles)},[state.portfolioFiles])

    return(
        <NewPortfolioContext.Provider value={{state}}>
            <NewPortfolioDispatch.Provider value={{onChangePortfolioName, onSetNameFinished, onChangeFiles, deleteFile, onSetFilesFinished, handleProcessRowUpdate}}>
                <div className="newPortfolioWrapper">
                    <PortfolioName/>
                    <SplitLine/>
                    <FileUploadContainer/>
                    <SplitLine/>
                    <Finalise/>
                </div> 
            </NewPortfolioDispatch.Provider>
        </NewPortfolioContext.Provider>
        
    );
};