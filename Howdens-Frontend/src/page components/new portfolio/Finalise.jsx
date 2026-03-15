import { useEffect, useState } from "react";
import Card from "../../global components/card/Card";
import EditFile from "./EditFile";
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from "./NewPortfolio";
import Button from "@mui/material/Button";
import './newPortfolio.scss'

export default function Finalise(){

    const{state} = useNewPortfolioStateContext();
    const{onSavePortfolio} = useNewPortfolioDispatchContext();

    const[errors, setErrors] = useState(false);

    useEffect(()=>{
        
        const hasErrors = state.portfolioFiles.some(file =>
            file.file.some(row => Object.keys(row.errors).length > 0)
        );

        setErrors(hasErrors)
    },[state.portfolioFiles])

    return(
        <Card>
            <div className="cardContainer">
                {!state.filesFinished && 
                    <div className="cardBlur">
                    
                    </div>
                }

                <h2 className="cardHeading">Finalise Data</h2>

                {state.filesFinished && state.portfolioFiles && state.portfolioFiles.length === 2 && state.portfolioFiles.map((file, index)=>(
                    <EditFile file={file} key={index} index={index}/>
                ))
                }

                <div className="finaliseSaveButtonWrapper">
                    <div className="finaliseSaveButtonContainer">
                        <Button sx={{textTransform:'none'}} variant="contained" size='small' disabled={errors} onClick={onSavePortfolio} loading={state.saving}>Save Portfolio</Button>
                    </div>
                </div>

            </div>
        </Card>
    );
}