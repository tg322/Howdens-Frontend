import CreatedByCell from "./CreatedByCell";

export const portfolioColumns = [
    { field: 'id', headerName: 'ID', width: 10, type: 'number' },
    { 
        field: "created_by", 
        headerName:"Created By", 
        width: 130, 
        renderCell: (params) => 
            <CreatedByCell 
                firstName={params.row.created_by_first_name} 
                lastName={params.row.created_by_last_name}
                email={params.row.created_by_email}
            />
    },
    { field: 'title', headerName: 'Portfolio Name', width: 130, type: 'string' },
    { 
        field: 'date_added', 
        headerName: 'date_added', 
        width: 130, 
        type: 'date',
        valueGetter: (_value, row) => {
            const value = row.date_added;

            if (value instanceof Date) {
                return value;
            }

            // Not a universal check as I have just realised that yyyy-mm-dd can conflict with dd/mm/yy and vice versa. API should either return date region code, plain date object or I should just use a date parse library here.

            if (typeof value === "string"){
                if(value.includes("-")){
                    const [year, month, day] = value.split("-");
                    return new Date(year, month - 1, day);
                }
            }

            return value;
        },
    },
    { field: 'total_files', headerName: 'total_files', width: 130, type: 'number' },
]