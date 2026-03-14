import Card from "../../global components/card/Card";
import EditFile from "./EditFile";
import { useNewPortfolioStateContext } from "./NewPortfolio";
import { useEffect } from "react";

export default function Finalise(){

    const{state} = useNewPortfolioStateContext();

    useEffect(()=>{console.log(state.portfolioFiles)},[state.portfolioFiles])

    return(
        <Card>
            <div style={{display:'flex', flexDirection:'column', position:'relative', boxSizing:'border-box', padding:'20px', gap:'20px'}}>
                {!state.filesFinished && 
                    <div style={{display:'flex', zIndex:'2', width:'100%', height:'100%', position:'absolute', backdropFilter:"blur(2px)", top:"0", left:"0", inset:"0"}}>
                    
                    </div>
                }

                <h2 style={{margin:'0px'}}>Finalise Data</h2>

                {state.filesFinished && state.portfolioFiles && state.portfolioFiles.map((file, index)=>(
                    <EditFile file={file} key={index} index={index}/>
                ))

                }
            </div>
        </Card>
    );
}