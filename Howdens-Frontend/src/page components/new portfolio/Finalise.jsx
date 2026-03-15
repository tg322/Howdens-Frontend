import { useEffect, useState } from "react";
import Card from "../../global components/card/Card";
import EditFile from "./EditFile";
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from "./NewPortfolio";
import Button from "@mui/material/Button";

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
            <div style={{display:'flex', flexDirection:'column', position:'relative', boxSizing:'border-box', padding:'20px', gap:'20px'}}>
                {!state.filesFinished && 
                    <div style={{display:'flex', zIndex:'2', width:'100%', height:'100%', position:'absolute', backdropFilter:"blur(2px)", top:"0", left:"0", inset:"0"}}>
                    
                    </div>
                }

                <h2 style={{margin:'0px'}}>Finalise Data</h2>

                {state.filesFinished && state.portfolioFiles && state.portfolioFiles.length === 2 && state.portfolioFiles.map((file, index)=>(
                    <EditFile file={file} key={index} index={index}/>
                ))
                }

                <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'end'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'120px', height:'auto'}}>
                        <Button sx={{textTransform:'none'}} variant="contained" size='small' disabled={errors} onClick={onSavePortfolio}>Save Portfolio</Button>
                    </div>
                </div>

            </div>
        </Card>
    );
}