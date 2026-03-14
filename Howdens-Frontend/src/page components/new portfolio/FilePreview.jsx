import { DataGrid } from '@mui/x-data-grid';

export default function FilePreview({rows, columns}){
    const paginationModel = { page: 0, pageSize: 5 };

    return(
        <div style={{display:'flex', flexDirection:'column', boxSizing:"border-box", padding:'0px 12px 8px 12px', width:'100%', gap:'10px'}}>
            <div style={{display:'flex', flexDirection:'column', boxSizing:'border-box', padding:'4px 8px', backgroundColor:'#516fd22e', borderRadius:'4px', width:'fit-content'}}>
                <code>Preview</code>
            </div>
            <DataGrid
                rows={rows}
                columns={columns.columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                rowHeight={34}
                columnHeaderHeight={40}
                sx={{ border: 0 }}
                hideFooter={true}
            />
        </div>   
    );
}