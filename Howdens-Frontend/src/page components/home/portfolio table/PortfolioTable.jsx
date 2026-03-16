import { DataGrid } from "@mui/x-data-grid"
import { useHomeStateContext } from "../../../pages/home/HomeContext"
import { portfolioColumns } from "./columns";
import './portfolio.scss'

export default function PortfolioTable(){

    const{state} = useHomeStateContext();

    const paginationModel = { page: 0, pageSize: 5 };

    return(
        <div className="portfolioTableContainer">
            <DataGrid
                rows={state.portfolios}
                columns={portfolioColumns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                rowHeight={30}
                columnHeaderHeight={40}
                loading={!state.portfolios}
            />
        </div>
 
    )
}