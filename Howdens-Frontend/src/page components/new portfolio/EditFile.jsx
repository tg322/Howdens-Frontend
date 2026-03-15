import { DataGrid } from "@mui/x-data-grid";
import { fileEditColumns } from "./columns";
import { useNewPortfolioDispatchContext } from "./NewPortfolio";
import { useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditOffRoundedIcon from '@mui/icons-material/EditOffRounded';
import './newPortfolio.scss'

export default function EditFile({file, index}){
    const{handleProcessRowUpdate} = useNewPortfolioDispatchContext();
    const paginationModel = { page: 0, pageSize: 5 };
    const columns = fileEditColumns.find((columns) => columns.fileName == file.name)
    const[showEdit, setShowEdit] = useState(false);

    function processRowUpdate(newRow, index){
        return handleProcessRowUpdate(newRow, index, file.name);
    }

    return(
        <div className="editFileContainer">
            <div className="editFileToolbar">
                <span>{file.name}</span>
                <Tooltip title="Edit File">
                    <IconButton aria-label="Preview" size="small" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} onClick={()=> setShowEdit(!showEdit)}>
                        
                        {!showEdit && <EditRoundedIcon fontSize="inherit" sx={{color:'#516fd273'}}/>}
                        {showEdit && <EditOffRoundedIcon fontSize="inherit" sx={{color:'#516fd273'}}/>}

                    </IconButton>
                </Tooltip>
            </div>
            {showEdit && 
                <DataGrid
                    rows={file.file}
                    columns={columns.columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 30]}
                    checkboxSelection={false}
                    rowHeight={34}
                    columnHeaderHeight={40}
                    sx={{ border: 0 }}
                    processRowUpdate={(newRow)=>processRowUpdate(newRow, index)}
                    onProcessRowUpdateError={(err)=> console.log(err)}
                />
            }
        </div>
    );
}