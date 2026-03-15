import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from "./NewPortfolio";
import Card from "../../global components/card/Card";
import NextButton from "./NextButton";
import './newPortfolio.scss'

export default function PortfolioName(){

    const{state} = useNewPortfolioStateContext();
    const{onChangePortfolioName, onSetNameFinished} = useNewPortfolioDispatchContext();

    function onChangeName(event){
        if(state.nameFinished == true){
            onSetNameFinished(false)
        }
        onChangePortfolioName(event.target.value)
    }

    function onNextButtonClick(){
        onSetNameFinished(true)
    }

    return(
        <Card height={200}>
            <div className="cardContainer">
                <h2 className="cardHeading">New Portfolio</h2>
                <div className="portfolioNameInputContainer">
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
                <NextButton disabled={!state.portfolioName} onButtonClick={onNextButtonClick}/>
            </div>
        </Card>
    );
}