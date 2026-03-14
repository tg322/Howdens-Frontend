import countryCodesList from './countryCodes.json'
import { Helpers } from '../../services/helpers'
import Cell from './Cell'
import Tooltip from '@mui/material/Tooltip'
import DateCell from './DateCell'

const helpers = new Helpers()

export const validationTypes = {
    notNum:"Value must be a number",
    empty:"Value cannot be empty",
    notStr:"Value must be a string",
    cntryScheme:"Scheme must be ISO2A",
    cntryCode:"Not a valid ISO2A country code.",
    occTooBig:"OCCTYPE must be less than 100"
}

//Allows for indexing against valid country codes and cell values.
//I would have used an api (GitHub repo), but I cant assume the code can access the internet therefore this is the safest option


export const fileColumns = [
    {
        fileName:'Test_Acc.csv', 
        columns:[
            { field: 'ACCNTNUM', headerName: 'ACCNTNUM', width: 130, type: 'string' },
            { field: 'ACCNTNAME', headerName: 'ACCNTNAME', width: 130, type: 'string' },
            { field: 'POLICYNUM', headerName: 'POLICYNUM', width: 130, type: 'string' },
            { field: 'POLICYTYPE', headerName: 'POLICYTYPE', width: 130, type: 'string' },
            { field: 'UNDCOVAMT', headerName: 'UNDCOVAMT', width: 130, type: 'number' },
            { field: 'PARTOF', headerName: 'PARTOF', width: 130, type: 'number' },
            { field: 'BLANLIMAMT', headerName: 'BLANLIMAMT', width: 130, type: 'number' },
            { field: 'BLANDEDAMT', headerName: 'BLANDEDAMT', width: 130, type: 'number' },
            { 
                field: 'INCEPTDATE', 
                headerName: 'INCEPTDATE', 
                width: 130, 
                type: 'date', 
                valueGetter: (_value, row) => {
                    //dd/mm/yyyy dates do not convert to Date natively, therefore we need to split out the values and insert them accordinl
                    const [day, month, year] = row.INCEPTDATE.split("/")
                    return(new Date(year,month -1,day))
                }
            },
            { 
                field: 'EXPIREDATE', 
                headerName: 'EXPIREDATE', 
                width: 130, 
                type: 'date', 
                valueGetter: (_value, row) => {
                    const [day, month, year] = row.EXPIREDATE.split("/")
                    return(new Date(year,month -1,day))
                }
            },
        ]
    },
    {
        fileName:'Test_Loc.csv', 
        columns:[
            { field: 'ACCNTNUM', headerName: 'ACCNTNUM', width: 130, type: 'string' },
            { field: 'LOCNUM', headerName: 'LOCNUM', width: 130, type: 'number' },
            { field: 'LOCNAME', headerName: 'LOCNAME', width: 130, type: 'string' },
            { field: 'LATITUDE', headerName: 'LATITUDE', width: 130, type: 'number' },
            { field: 'LONGITUDE', headerName: 'LONGITUDE', width: 130, type: 'number' },
            { field: 'CNTRYSCHEME', headerName: 'CNTRYSCHEME', width: 130, type: 'string' },
            { field: 'CNTRYCODE', headerName: 'CNTRYCODE', width: 130, type: 'string' },
            { field: 'EQCV1VAL', headerName: 'EQCV1VAL', width: 130, type: 'number' },
            { field: 'EQCV2VAL', headerName: 'EQCV2VAL', width: 130, type: 'number' },
            { field: 'EQCV3VAL', headerName: 'EQCV3VAL', width: 130, type: 'number' },
            { field: 'EQCV1DED', headerName: 'EQCV1DED', width: 130, type: 'number' },
            { field: 'EQCV3DED', headerName: 'EQCV3DED', width: 130, type: 'number' },
            { field: 'WSCV1VAL', headerName: 'WSCV1VAL', width: 130, type: 'number' },
            { field: 'WSCV2VAL', headerName: 'WSCV2VAL', width: 130, type: 'number' },
            { field: 'WSCV3VAL', headerName: 'WSCV3VAL', width: 130, type: 'number' },
            { field: 'WSCV1DED', headerName: 'WSCV1DED', width: 130, type: 'number' },
            { field: 'WSCV3DED', headerName: 'WSCV3DED', width: 130, type: 'number' },
            { field: 'FLCV1VAL', headerName: 'FLCV1VAL', width: 130, type: 'number' },
            { field: 'FLCV2VAL', headerName: 'FLCV2VAL', width: 130, type: 'number' },
            { field: 'FLCV3VAL', headerName: 'FLCV3VAL', width: 130, type: 'number' },
            { field: 'FLCV1DED', headerName: 'FLCV1DED', width: 130, type: 'number' },
            { field: 'FLCV3DED', headerName: 'FLCV3DED', width: 130, type: 'number' },
            { field: 'TOCV1VAL', headerName: 'TOCV1VAL', width: 130, type: 'number' },
            { field: 'TOCV2VAL', headerName: 'TOCV2VAL', width: 130, type: 'number' },
            { field: 'TOCV3VAL', headerName: 'TOCV3VAL', width: 130, type: 'number' },
            { field: 'TOCV1DED', headerName: 'TOCV1DED', width: 130, type: 'number' },
            { field: 'TOCV3DED', headerName: 'TOCV3DED', width: 130, type: 'number' },
            { field: 'FRCV1VAL', headerName: 'FRCV1VAL', width: 130, type: 'number' },
            { field: 'FRCV2VAL', headerName: 'FRCV2VAL', width: 130, type: 'number' },
            { field: 'FRCV3VAL', headerName: 'FRCV3VAL', width: 130, type: 'number' },
            { field: 'FRCV1DED', headerName: 'FRCV1DED', width: 130, type: 'number' },
            { field: 'NUMBLDGS', headerName: 'NUMBLDGS', width: 130, type: 'number' },
            { field: 'OCCSCHEME', headerName: 'OCCSCHEME', width: 130, type: 'string' },
            { field: 'OCCTYPE', headerName: 'OCCTYPE', width: 130, type: 'number' },
            { field: 'BLDGSCHEME', headerName: 'BLDGSCHEME', width: 130, type: 'string' },
            { field: 'BLDGCLASS', headerName: 'BLDGCLASS', width: 130, type: 'number' },
        ]
    },
]


export const filePreviewColumns = [
    {
        fileName:'Test_Acc.csv', 
        columns:[
            { field: 'ACCNTNUM', headerName: 'ACCNTNUM', width: 130, type: 'string' },
            { field: 'ACCNTNAME', headerName: 'ACCNTNAME', width: 130, type: 'string' },
            { field: 'POLICYNUM', headerName: 'POLICYNUM', width: 130, type: 'string' },
            { field: 'POLICYTYPE', headerName: 'POLICYTYPE', width: 130, type: 'string' },
            { field: 'UNDCOVAMT', headerName: 'UNDCOVAMT', width: 130, type: 'number' },
            { field: 'PARTOF', headerName: 'PARTOF', width: 130, type: 'number' },
            { field: 'BLANLIMAMT', headerName: 'BLANLIMAMT', width: 130, type: 'number' },
            { field: 'BLANDEDAMT', headerName: 'BLANDEDAMT', width: 130, type: 'number' },
            { 
                field: 'INCEPTDATE', 
                headerName: 'INCEPTDATE', 
                width: 130, 
                type: 'date', 
                valueGetter: (_value, row) => {
                    //dd/mm/yyyy dates do not convert to Date natively, therefore we need to split out the values and insert them accordingly
                    const [day, month, year] = row.INCEPTDATE.split("/")
                    return(new Date(year,month -1,day))
                }
            },
            { 
                field: 'EXPIREDATE', 
                headerName: 'EXPIREDATE', 
                width: 130, 
                type: 'date', 
                valueGetter: (_value, row) => {
                    const [day, month, year] = row.EXPIREDATE.split("/")
                    return(new Date(year,month -1,day))
                }
            },
        ]
    },
    {
        fileName:'Test_Loc.csv', 
        columns:[
            { field: 'ACCNTNUM', headerName: 'ACCNTNUM', width: 130, type: 'string' },
            { field: 'LOCNUM', headerName: 'LOCNUM', width: 130, type: 'number' },
            { field: 'LOCNAME', headerName: 'LOCNAME', width: 130, type: 'string' },
            { field: 'LATITUDE', headerName: 'LATITUDE', width: 130, type: 'number' },
            { field: 'LONGITUDE', headerName: 'LONGITUDE', width: 130, type: 'number' },
            { field: 'CNTRYSCHEME', headerName: 'CNTRYSCHEME', width: 130, type: 'string' },
            { field: 'CNTRYCODE', headerName: 'CNTRYCODE', width: 130, type: 'string' },
            { field: 'EQCV1VAL', headerName: 'EQCV1VAL', width: 130, type: 'number' },
            { field: 'EQCV2VAL', headerName: 'EQCV2VAL', width: 130, type: 'number' },
            { field: 'EQCV3VAL', headerName: 'EQCV3VAL', width: 130, type: 'number' },
            { field: 'EQCV1DED', headerName: 'EQCV1DED', width: 130, type: 'number' },
            { field: 'EQCV3DED', headerName: 'EQCV3DED', width: 130, type: 'number' },
            { field: 'WSCV1VAL', headerName: 'WSCV1VAL', width: 130, type: 'number' },
            { field: 'WSCV2VAL', headerName: 'WSCV2VAL', width: 130, type: 'number' },
            { field: 'WSCV3VAL', headerName: 'WSCV3VAL', width: 130, type: 'number' },
            { field: 'WSCV1DED', headerName: 'WSCV1DED', width: 130, type: 'number' },
            { field: 'WSCV3DED', headerName: 'WSCV3DED', width: 130, type: 'number' },
            { field: 'FLCV1VAL', headerName: 'FLCV1VAL', width: 130, type: 'number' },
            { field: 'FLCV2VAL', headerName: 'FLCV2VAL', width: 130, type: 'number' },
            { field: 'FLCV3VAL', headerName: 'FLCV3VAL', width: 130, type: 'number' },
            { field: 'FLCV1DED', headerName: 'FLCV1DED', width: 130, type: 'number' },
            { field: 'FLCV3DED', headerName: 'FLCV3DED', width: 130, type: 'number' },
            { field: 'TOCV1VAL', headerName: 'TOCV1VAL', width: 130, type: 'number' },
            { field: 'TOCV2VAL', headerName: 'TOCV2VAL', width: 130, type: 'number' },
            { field: 'TOCV3VAL', headerName: 'TOCV3VAL', width: 130, type: 'number' },
            { field: 'TOCV1DED', headerName: 'TOCV1DED', width: 130, type: 'number' },
            { field: 'TOCV3DED', headerName: 'TOCV3DED', width: 130, type: 'number' },
            { field: 'FRCV1VAL', headerName: 'FRCV1VAL', width: 130, type: 'number' },
            { field: 'FRCV2VAL', headerName: 'FRCV2VAL', width: 130, type: 'number' },
            { field: 'FRCV3VAL', headerName: 'FRCV3VAL', width: 130, type: 'number' },
            { field: 'FRCV1DED', headerName: 'FRCV1DED', width: 130, type: 'number' },
            { field: 'NUMBLDGS', headerName: 'NUMBLDGS', width: 130, type: 'number' },
            { field: 'OCCSCHEME', headerName: 'OCCSCHEME', width: 130, type: 'string' },
            { field: 'OCCTYPE', headerName: 'OCCTYPE', width: 130, type: 'number' },
            { field: 'BLDGSCHEME', headerName: 'BLDGSCHEME', width: 130, type: 'string' },
            { field: 'BLDGCLASS', headerName: 'BLDGCLASS', width: 130, type: 'number' },
        ]
    },
]

function validateACCField(field, value){
    if(field === "ACCNTNUM"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }
    }

    if(field === "ACCNTNAME"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }
    }

    if(field === "POLICYNUM"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }
    }

    if(field === "POLICYTYPE"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }else if(!helpers.isNumber(value)) {
            return validationTypes.notNum;
        }
    }

    if(field === "UNDCOVAMT"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }else if(!helpers.isNumber(value)) {
            return validationTypes.notNum;
        }
    }

    if(field === "PARTOF"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }else if(!helpers.isNumber(value)) {
            return validationTypes.notNum;
        }
    }

    if(field === "BLANLIMAMT"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }else if(!helpers.isNumber(value)) {
            return validationTypes.notNum;
        }
    }

    if(field === "BLANDEDAMT"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }else if(!helpers.isNumber(value)) {
            return validationTypes.notNum;
        }
    }

    if(field === "INCEPTDATE"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }
    }

    if(field === "EXPIREDATE"){
        if(value == null || value == undefined || value.length === 0){
            return validationTypes.empty;
        }
    }

    return null
}

export const fileEditColumns = [
    {
        fileName:'Test_Acc.csv', 
        columns:[
            { 
                field: 'ACCNTNUM', 
                headerName: 'ACCNTNUM', 
                width: 130, 
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            { 
                field: 'ACCNTNAME', 
                headerName: 'ACCNTNAME', 
                width: 130, 
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
            },
            { 
                field: 'POLICYNUM', 
                headerName: 'POLICYNUM', 
                width: 130, 
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
            },
            { 
                field: 'POLICYTYPE', 
                headerName: 'POLICYTYPE', 
                width: 130, 
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
                valueGetter: (_value, row) => {
                    return(Number(row.POLICYTYPE))
                }
            },
            { 
                field: 'UNDCOVAMT',
                headerName: 'UNDCOVAMT', 
                width: 130, 
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
                valueGetter: (_value, row) => {
                    return(Number(row.UNDCOVAMT))
                }
            },
            { 
                field: 'PARTOF',
                headerName: 'PARTOF',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
                valueGetter: (_value, row) => {
                    return(Number(row.PARTOF))
                }
            },
            { 
                field: 'BLANLIMAMT',
                headerName: 'BLANLIMAMT',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
                valueGetter: (_value, row) => {
                    return(Number(row.BLANLIMAMT))
                }
            },
            {
                field: 'BLANDEDAMT',
                headerName: 'BLANDEDAMT',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors[params.field]}/>,
                valueGetter: (_value, row) => {
                    return(Number(row.BLANDEDAMT))
                }
            },
            { 
                field: 'INCEPTDATE', 
                headerName: 'INCEPTDATE', 
                width: 130, 
                type: 'date',
                valueGetter: (_value, row) => {
                    const value = row.INCEPTDATE;

                    if (value instanceof Date) {
                        return value;
                    }

                    if (typeof value === "string" && value.includes("/")) {
                        const [day, month, year] = value.split("/");
                        return new Date(year, month - 1, day);
                    }

                    return value;
                },
                editable: true,
                renderCell: (params) => <DateCell {...params} errorMessage={params.row.errors[params.field]}/>,

            },
            { 
                field: 'EXPIREDATE', 
                headerName: 'EXPIREDATE', 
                width: 130, 
                type: 'date', 
                valueGetter: (_value, row) => {
                    const value = row.EXPIREDATE;

                    if (value instanceof Date) {
                        return value;
                    }

                    if (typeof value === "string" && value.includes("/")) {
                        const [day, month, year] = value.split("/");
                        return new Date(year, month - 1, day);
                    }

                    return value;
                },
                editable: true,
                renderCell: (params) => <DateCell {...params} errorMessage={params.row.errors[params.field]}/>
            },
        ]
    },
    {
        fileName:'Test_Loc.csv', 
        columns:[
            { 
                field: 'ACCNTNUM', 
                headerName: 'ACCNTNUM', 
                width: 130, 
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            { 
                field: 'LOCNUM',
                headerName: 'LOCNUM',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            { 
                field: 'LOCNAME',
                headerName: 'LOCNAME',
                width: 130,
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'LATITUDE',
                headerName: 'LATITUDE',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'LONGITUDE',
                headerName: 'LONGITUDE',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'CNTRYSCHEME',
                headerName: 'CNTRYSCHEME',
                width: 130,
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            { 
                field: 'CNTRYCODE',
                headerName: 'CNTRYCODE',
                width: 130,
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'EQCV1VAL',
                headerName: 'EQCV1VAL',
                width: 130,
                type: 'number', 
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'EQCV2VAL',
                headerName: 'EQCV2VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'EQCV3VAL',
                headerName: 'EQCV3VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'EQCV1DED',
                headerName: 'EQCV1DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'EQCV3DED',
                headerName: 'EQCV3DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'WSCV1VAL',
                headerName: 'WSCV1VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'WSCV2VAL',
                headerName: 'WSCV2VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'WSCV3VAL',
                headerName: 'WSCV3VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'WSCV1DED',
                headerName: 'WSCV1DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'WSCV3DED',
                headerName: 'WSCV3DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FLCV1VAL',
                headerName: 'FLCV1VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FLCV2VAL',
                headerName: 'FLCV2VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FLCV3VAL',
                headerName: 'FLCV3VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FLCV1DED',
                headerName: 'FLCV1DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FLCV3DED',
                headerName: 'FLCV3DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'TOCV1VAL',
                headerName: 'TOCV1VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'TOCV2VAL',
                headerName: 'TOCV2VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'TOCV3VAL',
                headerName: 'TOCV3VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'TOCV1DED',
                headerName: 'TOCV1DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'TOCV3DED',
                headerName: 'TOCV3DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FRCV1VAL',
                headerName: 'FRCV1VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FRCV2VAL',
                headerName: 'FRCV2VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FRCV3VAL',
                headerName: 'FRCV3VAL',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'FRCV1DED',
                headerName: 'FRCV1DED',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'NUMBLDGS',
                headerName: 'NUMBLDGS',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'OCCSCHEME',
                headerName: 'OCCSCHEME',
                width: 130,
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'OCCTYPE',
                headerName: 'OCCTYPE',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'BLDGSCHEME',
                headerName: 'BLDGSCHEME',
                width: 130,
                type: 'string',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
            {
                field: 'BLDGCLASS',
                headerName: 'BLDGCLASS',
                width: 130,
                type: 'number',
                editable: true,
                renderCell: (params) => <Cell {...params} errorMessage={params.row.errors?.[params.field]}/>,
            },
        ]
    },
]
