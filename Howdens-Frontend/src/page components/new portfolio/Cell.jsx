import Tooltip from "@mui/material/Tooltip";
import './newPortfolio.scss'

export default function Cell(props) {
    const { errorMessage, ...editCellProps } = props;
    if(errorMessage){
        return (
            <Tooltip
                title={errorMessage || ""}
                placement="bottom"
            >
                <div className="errorCell">
                    <span>{editCellProps.value}</span>
                </div>
            </Tooltip>
        );
    }else{
        return (
            <div>
                <span>{editCellProps.value}</span>
            </div>
        );
    }
    
}
