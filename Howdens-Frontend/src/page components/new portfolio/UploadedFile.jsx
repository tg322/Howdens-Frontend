import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { useNewPortfolioDispatchContext } from "./NewPortfolio";
import { filePreviewColumns } from "./columns";
import FilePreview from "./FilePreview";

export default function UploadedFile({index, file}){
    const[showPreview, setShowPreview] = useState(false);
    const{deleteFile} = useNewPortfolioDispatchContext();
    const previewRows = file.file.slice(0,5);
    const columns = filePreviewColumns.find((columns) => columns.fileName == file.name)

    return(
        <div key={index} style={{display:'flex', flexDirection:'column', width:'100%', borderRadius:'8px', backgroundColor:'#ededed', boxSizing:'border-box'}}>
            <div style={{display:'flex', flexDirection:'row', width:'100%',boxSizing:'border-box', padding:'8px 12px', alignItems:"center", justifyContent:'space-between'}}>
                <span>{file.name}</span>
                <div style={{display:'flex', flexDirection:'row', width:'fit-content', gap:'10px'}}>
                    <Tooltip title="Preview">
                        <IconButton aria-label="Preview" size="small" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} onClick={()=> setShowPreview(!showPreview)}>
                            <VisibilityIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton aria-label="Preview" size="small" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} onClick={()=> deleteFile(index)}>
                            <DeleteForeverIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            {showPreview && columns &&
                <FilePreview rows={previewRows} columns={columns}/>
            }
        </div>
    );
}