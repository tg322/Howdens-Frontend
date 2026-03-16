import FileUpload from './FileUpload';
import './newPortfolio.scss'
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from './NewPortfolio';
import UploadedFile from './UploadedFile';
import Card from '../../global components/card/Card';
import IconButton from '@mui/material/IconButton';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import NextButton from './NextButton';

export default function FileUploadContainer(){

    const{state} = useNewPortfolioStateContext();
    const{onSetFilesFinished} = useNewPortfolioDispatchContext();

    function nextButtonOnClick(){
        onSetFilesFinished(true)
    }

    return(
        <Card height={800}>
            <div className='fileUploadCard'>
                {
                    !state.nameFinished &&
                    <div className='cardBlur'>

                    </div>
                }
                
                <h2 className='cardHeading'>Add Files</h2>
                {state.portfolioFiles && state.portfolioFiles.length < 2 &&
                    <FileUpload/>
                }
                {state.portfolioFiles && state.portfolioFiles.length > 0 && Array.from(state.portfolioFiles).map((file, index) => (
                    <UploadedFile key={index} index={index} file={file}/>
                ))}
                {state.portfolioFiles && state.portfolioFiles.length == 2 &&
                    <NextButton disabled={state.portfolioFiles.length < 2} onButtonClick={nextButtonOnClick}/>
                }
                </div>
        </Card>
    );
}