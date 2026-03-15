import IconButton from "@mui/material/IconButton"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import './newPortfolio.scss'

export default function NextButton({disabled, onButtonClick}){

    return(
        <div className="nextButtonWrapper">
            <div className="nextButtonContainer">
                <IconButton aria-label="add portfolio" size="large" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} disabled={disabled} onClick={onButtonClick}>
                    <ArrowForwardRoundedIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                </IconButton>
            </div>
        </div>
    )
}