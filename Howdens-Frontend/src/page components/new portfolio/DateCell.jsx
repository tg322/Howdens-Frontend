import Tooltip from "@mui/material/Tooltip";

export default function DateCell(props) {
    const { errorMessage, ...editCellProps } = props;

    if(errorMessage){
        return (
            <Tooltip
                title={errorMessage || ""}
                placement="bottom"
            >
                <div style={{backgroundColor:'red'}}>
                    <span>{editCellProps.formattedValue}</span>
                </div>
            </Tooltip>
        );
    }else{
        return (
            <div>
                <span>{editCellProps.formattedValue}</span>
            </div>
        );
    }
    
}
