import { DataGrid } from "@mui/x-data-grid";
import { fileEditColumns } from "./columns";
import { useNewPortfolioDispatchContext } from "./NewPortfolio";


export default function EditFile({file, index}){
    const{handleProcessRowUpdate} = useNewPortfolioDispatchContext();
    const paginationModel = { page: 0, pageSize: 5 };
    const columns = fileEditColumns.find((columns) => columns.fileName == file.name)

    function processRowUpdate(newRow, index){
        return handleProcessRowUpdate(newRow, index, file.name);
    }

    return(
        <div style={{display:'flex', flexDirection:'column', width:'100%', gap:'10px'}}>
            <span>{file.name}</span>
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
        </div>
    );
}