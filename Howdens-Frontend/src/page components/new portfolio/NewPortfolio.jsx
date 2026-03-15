import { createContext, useContext, useCallback, useReducer, useEffect } from "react";
import FileUploadContainer from './FileUploadContainer';
import PortfolioName from './PortfolioName';
import "./newPortfolio.scss"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SplitLine from "./SplitLine";
import { initialNewPortfolioContextReducer, NewPortfolioContextReducer } from "./NewPortfolioReducer";
import { Helpers } from "../../services/helpers";
import Finalise from "./Finalise";
import { useAuthStateContext } from "../../auth/AuthContext";
import { Utilities } from "../../services/utilities";

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

    const navigate = useNavigate()

    const{userDetails} = useAuthStateContext();

    const helpers = new Helpers();
    const utilities = new Utilities();

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
        dispatch({type:"SET_FILES_FINISHED", payload:false})
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

    const onSavePortfolio = useCallback(async ()=>{

        //For each file, recrete it with the original values
        //in the file property, const {errors, ...restOfRow} = remove errors and id, and leave the rest, return the new row inside the file map function
        //the map then continues onto the next file

        dispatch({type:"SET_SAVING", payload:true})

        const updatedFiles = state.portfolioFiles.map(file => ({
            ...file,
            file: file.file.map(row => {
                const { errors, id, ...restOfRow } = row;
                return restOfRow;
            })
        }));

        const csvFiles = helpers.prepareFilesForUpload(updatedFiles)

        const portfolio = {
            email:userDetails.email,
            portfolio_name:state.portfolioName,
            files:csvFiles
        }

        const response = await utilities.uploadPortfolio(portfolio)

        if(response.error){
            dispatch({type:"SET_SAVING_ERROR", payload:response.error})
        }else{
            navigate("/home")
        }   

    },[state.portfolioFiles, state.portfolioName])

    return(
        <NewPortfolioContext.Provider value={{state}}>
            <NewPortfolioDispatch.Provider value={{onChangePortfolioName, onSetNameFinished, onChangeFiles, deleteFile, onSetFilesFinished, handleProcessRowUpdate, onSavePortfolio}}>
                    <PortfolioName/>
                    <SplitLine/>
                    <FileUploadContainer/>
                    <SplitLine/>
                    <Finalise/>
            </NewPortfolioDispatch.Provider>
        </NewPortfolioContext.Provider>
        
    );
};