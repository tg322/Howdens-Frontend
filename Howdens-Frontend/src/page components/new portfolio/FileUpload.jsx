import { useRef, useState } from "react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import './NewPortfolio.scss'
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from "./NewPortfolio";


export default function FileUpload(){

    const{state} = useNewPortfolioStateContext();
    const{onChangeFiles} = useNewPortfolioDispatchContext();


    const inputFile = useRef(null);

    function uploadFileClick(){
        if(inputFile.current){
            inputFile.current.click();
        }
    }

    function onDragOver(event){
        event.preventDefault();
        
    }

    async function handleDrop(event){
        event.preventDefault();
        let files = event.dataTransfer.files;
        onChangeFiles(files);
    }

    async function handleChange(files){
        onChangeFiles(files);
    }

    return(
        <div className='fileUploadWrapper'>
            <input
                style={{display:'none'}}
                type="file"
                ref={inputFile}
                className="inputFile"
                accept=".csv,text/csv"
                name="file"
                onChange={(e) => {
                    if (e.target.files) {
                        handleChange(e.target.files);
                    }
                }}
                
            />
            <label id='file-drop-zone'
                className="fileUploadDropZoneLabel"
                onClick={(e) => {
                    // Prevent default only if NOT triggered from the span
                    if (!e.target.closest('.uploadTrigger')) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }}
                onDragOver={onDragOver}
                onDrop={handleDrop}
            >
                <div className='fileUploadDropZoneContentContainer'>
                    <SaveAltIcon/>
                    <div className="fileUploadDropZoneContent">
                        <p>Drag & Drop or <span className='uploadTrigger' onClick={uploadFileClick}>Choose Files</span> to upload.</p>
                        <span>Max files: 2</span>
                        <span>Supported formats: .CSV</span>
                    </div>
                </div>
                
                
            </label>
            <div className='fileUploadDropZoneMaxSizeContainer'>
                <span>Max file size: 2MB</span>
                {state.overFileCount && <span style={{color:'darkred'}}>Too many files, please upload a maximum of 2 files.</span>}
                {state.overFileSize && <span style={{color:'darkred'}}>File size too large, please try again.</span>}
            </div>
        </div>
    );
}