import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from "./NewPortfolio";
import Card from "../../global components/card/Card";

export default function PortfolioName(){

    const{state} = useNewPortfolioStateContext();
    const{onChangePortfolioName, onSetNameFinished} = useNewPortfolioDispatchContext();

    function onChangeName(event){
        if(state.nameFinished == true){
            onSetNameFinished(false)
        }
        onChangePortfolioName(event.target.value)
    }

    return(
        <Card height={200}>
            <div style={{display:'flex', flexDirection:'column', boxSizing:'border-box', padding:'20px', gap:'20px'}}>
                <h2 style={{margin:'0px', fontWeight:'400'}}>New Portfolio</h2>
                <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <InputLabel shrink>Portfolio Name</InputLabel>
                    <TextField
                        placeholder="E.G My Portfolio"
                        variant="outlined"
                        size='small'
                        type='text'
                        onChange={onChangeName}
                        value={state.portfolioName}
                    />
                </div>
                <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'end'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'60px', height:'auto'}}>
                        <IconButton aria-label="add portfolio" size="large" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} disabled={!state.portfolioName} onClick={()=> onSetNameFinished(true)}>
                            <ArrowForwardRoundedIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </Card>
    );
}