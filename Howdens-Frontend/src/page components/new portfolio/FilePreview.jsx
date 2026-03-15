import { DataGrid } from '@mui/x-data-grid';
import './newPortfolio.scss'

export default function FilePreview({rows, columns}){
    const paginationModel = { page: 0, pageSize: 5 };

    return(
        <div className='filePreviewContainer'>
            <div className='filePreviewTitleBubble'>
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