import Papa from "papaparse";
import { validationTypes } from "../page components/new portfolio/columns";
import countryCodesList from '../page components/new portfolio/countryCodes.json'

export class Helpers{

    async parseCSV(file){
        return new Promise((resolve, reject)=>{
            Papa.parse(file, {
                header:true,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (err) => reject(err)
            });
        })
    }

    async prepareFiles(rawFiles){
        const preparedFiles = [];
        for (const rawFile of rawFiles) {
            const preparedCSV = await this.parseCSV(rawFile);

            let rows = []
            //Inject an id column so DataGrid does not complain.
            if(rawFile.name === "Test_Acc.csv"){
                preparedCSV.map((row,index)=>{
                    rows.push(this.validateACC(row, index))
                })
                    
                
            }else if(rawFile.name === "Test_Loc.csv"){
                preparedCSV.map((row,index)=>{
                    rows.push(this.validateLOC(row, index))
                })
            }

            const preparedFile = {
                name: rawFile.name,
                size: rawFile.size,
                file: rows
            };

            preparedFiles.push(preparedFile);
        }
        return preparedFiles
    }

    //This method checks if the file when uploaded has pre-existing validation errors
    //Creates an errors array which can then be used in the DataGrid validation to highlight cells which do not pass validation
    validateACC(row, index){
            const id = index;
            const errors = {};

            if(!row.ACCNTNUM || row.ACCNTNUM.length === 0){
                errors.ACCNTNUM = validationTypes.empty;
            }

            if(!row.ACCNTNAME || row.ACCNTNAME.length === 0){
                errors.ACCNTNAME = validationTypes.empty;
            }

            if(!row.POLICYNUM || row.POLICYNUM.length === 0){
                errors.POLICYNUM = validationTypes.empty;
            }

            if(!row.POLICYTYPE || row.POLICYTYPE.length === 0){
                errors.POLICYTYPE = validationTypes.empty;
            }else if(!this.isNumber(Number(row.POLICYTYPE))) {
                errors.POLICYTYPE = validationTypes.notNum;
            }

            if(!row.UNDCOVAMT ||row.UNDCOVAMT.length === 0){
                errors.UNDCOVAMT = validationTypes.empty
            }else if(!this.isNumber(Number(row.UNDCOVAMT))){
                errors.UNDCOVAMT = validationTypes.notNum
            }

            if(!row.PARTOF || row.PARTOF.length === 0){
                errors.PARTOF = validationTypes.empty
            }else if (!this.isNumber(Number(row.PARTOF))){
                errors.PARTOF = validationTypes.notNum
            }

            if(!row.BLANLIMAMT || row.BLANLIMAMT.length === 0){
                errors.BLANLIMAMT = validationTypes.empty
            }else if(!this.isNumber(Number(row.BLANLIMAMT))){
                errors.BLANLIMAMT = validationTypes.notNum
            }

            if(!row.BLANDEDAMT || row.BLANDEDAMT.length === 0){
                errors.BLANDEDAMT = validationTypes.empty
            }else if(!this.isNumber(Number(row.BLANDEDAMT))){
                errors.BLANDEDAMT = validationTypes.notNum
            }

            if(!row.INCEPTDATE || row.INCEPTDATE.length === 0){
                errors.INCEPTDATE = validationTypes.empty
            }//Not sure how to check if valid date string, but it would be here otherwise.

            if(!row.EXPIREDATE || row.EXPIREDATE.length === 0){
                errors.EXPIREDATE = validationTypes.empty
            }//again, not sure how to validate a date here.


            return {
                ...row,
                id,
                errors
            };
    }

    //This method checks if the file when uploaded has pre-existing validation errors
    //Creates an errors array which can then be used in the DataGrid validation to highlight cells which do not pass validation
    validateLOC(row, index){
            const id = index;
            const errors = {};
            const countryCodes = new Set(countryCodesList)

            if(!row.ACCNTNUM || row.ACCNTNUM.length === 0){
                errors.ACCNTNUM = validationTypes.empty
            }


            if(!row.LOCNUM || row.LOCNUM.length === 0){
                errors.LOCNUM = validationTypes.empty
            }else if(!this.isNumber(Number(row.LOCNUM))){
                errors.LOCNUM = validationTypes.notNum
            }

            if(!row.LOCNAME || row.LOCNAME.length === 0){
                errors.LOCNAME = validationTypes.empty
            }

            if(!row.LATITUDE || row.LATITUDE.length === 0){
                errors.LATITUDE = validationTypes.empty
            }else if(!this.isNumber(Number(row.LATITUDE))){
                errors.LATITUDE = validationTypes.notNum
            }

            if(!row.LONGITUDE || row.LONGITUDE.length === 0){
                errors.LONGITUDE = validationTypes.empty
            }else if(!this.isNumber(Number(row.LONGITUDE))){
                errors.LONGITUDE = validationTypes.notNum
            }

            if(!row.CNTRYSCHEME || row.CNTRYSCHEME.length === 0){
                errors.CNTRYSCHEME = validationTypes.empty
            }else if(row.CNTRYSCHEME !== "ISO2A"){
                errors.CNTRYSCHEME = validationTypes.cntryScheme
            }

            if(!row.CNTRYCODE || row.CNTRYCODE.length === 0){
                errors.CNTRYCODE = validationTypes.empty
            }else if(!countryCodes.has(row.CNTRYCODE)){
                errors.CNTRYCODE = validationTypes.cntryCode
            }

            if(!row.EQCV1VAL || row.EQCV1VAL.length === 0){
                errors.EQCV1VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.EQCV1VAL))){
                errors.EQCV1VAL = validationTypes.notNum
            }
            
            if(!row.EQCV2VAL || row.EQCV2VAL.length === 0){
                errors.EQCV2VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.EQCV2VAL))){
                errors.EQCV2VAL = validationTypes.notNum
            }


            if(!row.EQCV3VAL || row.EQCV3VAL.length === 0){
                errors.EQCV3VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.EQCV3VAL))){
                errors.EQCV3VAL = validationTypes.notNum
            }

            if(!row.EQCV1DED || row.EQCV1DED.length === 0){
                errors.EQCV1DED = validationTypes.empty
            }else if(!this.isNumber(Number(row.EQCV1DED))){
                errors.EQCV1DED = validationTypes.notNum
            }

            if(!row.EQCV3DED || row.EQCV3DED.length === 0){
                errors.EQCV3DED = validationTypes.empty
            }else if(!this.isNumber(Number(row.EQCV3DED))){
                errors.EQCV3DED = validationTypes.notNum
            }

            if(!row.WSCV1VAL || row.WSCV1VAL.length === 0){
                errors.WSCV1VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.WSCV1VAL))){
                errors.WSCV1VAL = validationTypes.notNum
            }


            if(!row.WSCV2VAL || row.WSCV2VAL.length === 0){
                errors.WSCV2VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.WSCV2VAL))){
                errors.WSCV2VAL = validationTypes.notNum
            }

            if(!row.WSCV3VAL || row.WSCV3VAL.length === 0){
                errors.WSCV3VAL = validationTypes.empty
            }else if(!this.isNumber(Number(row.WSCV3VAL))){
                errors.WSCV3VAL = validationTypes.notNum
            }

            if(!row.WSCV1DED || row.WSCV1DED.length === 0){
                errors.WSCV1DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.WSCV1DED))){
                errors.WSCV1DED = validationTypes.notNum
            }

            if(!row.WSCV3DED || row.WSCV3DED.length === 0){
                errors.WSCV3DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.WSCV3DED))){
                errors.WSCV3DED = validationTypes.notNum
            }

            if(!row.FLCV1VAL || row.FLCV1VAL.length === 0){
                errors.FLCV1VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FLCV1VAL))){
                errors.FLCV1VAL = validationTypes.notNum
            }

            if(!row.FLCV2VAL || row.FLCV2VAL.length === 0){
                errors.FLCV2VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FLCV2VAL))){
                errors.FLCV2VAL = validationTypes.notNum
            }

            if(!row.FLCV3VAL || row.FLCV3VAL.length === 0){
                errors.FLCV3VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FLCV3VAL))){
                errors.FLCV3VAL = validationTypes.notNum
            }

            if(!row.FLCV1DED || row.FLCV1DED.length === 0){
                errors.FLCV1DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FLCV1DED))){
                errors.FLCV1DED = validationTypes.notNum
            }

            if(!row.FLCV3DED || row.FLCV3DED.length === 0){
                errors.FLCV3DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FLCV3DED))){
                errors.FLCV3DED = validationTypes.notNum
            }

            if(!row.TOCV1VAL || row.TOCV1VAL.length === 0){
                errors.TOCV1VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.TOCV1VAL))){
                errors.TOCV1VAL = validationTypes.notNum
            }

            if(!row.TOCV2VAL || row.TOCV2VAL.length === 0){
                errors.TOCV2VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.TOCV2VAL))){
                errors.TOCV2VAL = validationTypes.notNum
            }

            if(!row.TOCV3VAL || row.TOCV3VAL.length === 0){
                errors.TOCV3VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.TOCV3VAL))){
                errors.TOCV3VAL = validationTypes.notNum
            }

            if(!row.TOCV1DED || row.TOCV1DED.length === 0){
                errors.TOCV1DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.TOCV1DED))){
                errors.TOCV1DED = validationTypes.notNum
            }

            if(!row.TOCV3DED || row.TOCV3DED.length === 0){
                errors.TOCV3DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.TOCV3DED))){
                errors.TOCV3DED = validationTypes.notNum
            }

            if(!row.FRCV1VAL || row.FRCV1VAL.length === 0){
                errors.FRCV1VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FRCV1VAL))){
                errors.FRCV1VAL = validationTypes.notNum
            }

            if(!row.FRCV2VAL || row.FRCV2VAL.length === 0){
                errors.FRCV2VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FRCV2VAL))){
                errors.FRCV2VAL = validationTypes.notNum
            }

            if(!row.FRCV3VAL || row.FRCV3VAL.length === 0){
                errors.FRCV3VAL = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FRCV3VAL))){
                errors.FRCV3VAL = validationTypes.notNum
            }

            if(!row.FRCV1DED || row.FRCV1DED.length === 0){
                errors.FRCV1DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FRCV1DED))){
                errors.FRCV1DED = validationTypes.notNum
            }

            if(!row.FRCV3DED || row.FRCV3DED.length === 0){
                errors.FRCV3DED = validationTypes.empty;
            }else if(!this.isNumber(Number(row.FRCV3DED))){
                errors.FRCV3DED = validationTypes.notNum
            }

            if(!row.OCCSCHEME || row.OCCSCHEME.length === 0){
                errors.OCCSCHEME = validationTypes.empty;
            }

            if(!row.OCCTYPE || row.OCCTYPE.length === 0){
                errors.OCCTYPE = validationTypes.empty;
            }else if(!this.isNumber(Number(row.OCCTYPE))){
                errors.OCCTYPE = validationTypes.notNum
            }else if(Number(row.OCCTYPE) > 100){
                errors.OCCTYPE = validationTypes.occTooBig
            }

            if(!row.BLDGSCHEME || row.BLDGSCHEME.length === 0){
                errors.BLDGSCHEME = validationTypes.empty;
            }

            if(!row.BLDGCLASS || row.BLDGCLASS.length === 0){
                errors.BLDGCLASS = validationTypes.empty;
            }else if(!this.isNumber(Number(row.BLDGCLASS))){
                errors.BLDGCLASS = validationTypes.notNum
            }


            return {
                ...row,
                id,
                errors
            };
    }

    //Literally checks if a value is a number.
    isNumber(value){
        return typeof value == "number"
    }
    
}