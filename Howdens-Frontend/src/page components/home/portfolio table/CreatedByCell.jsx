import Tooltip from "@mui/material/Tooltip";
import './portfolio.scss'

export default function CreatedByCell({firstName, lastName, email}){
    return(
        <Tooltip title={email}>
            <div>
                <div className="createdByCellContainer">
                    <div className="createdByCellInitialsCircle">
                        <span>{`${firstName[0]} ${lastName[0]}`}</span>
                    </div>
                    <div className="createdByCellNameContainer">
                        <span>{firstName} {lastName}</span>
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}