import Tooltip from "@mui/material/Tooltip";

export default function Cell(props) {
    const { errorMessage, ...editCellProps } = props;
    if(errorMessage){
        return (
            <Tooltip
                title={errorMessage || ""}
                placement="bottom"
            >
                <div style={{display:'flex', backgroundColor:'#ff000040', height:'100%', width:'100%'}}>
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
