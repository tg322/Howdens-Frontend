import FileUpload from './FileUpload';
import './newPortfolio.scss'
import { useNewPortfolioDispatchContext, useNewPortfolioStateContext } from './NewPortfolio';
import UploadedFile from './UploadedFile';
import Card from '../../global components/card/Card';
import IconButton from '@mui/material/IconButton';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function FileUploadContainer(){

    const{state} = useNewPortfolioStateContext();
    const{onSetFilesFinished} = useNewPortfolioDispatchContext();

    return(
        <Card height={800}>
            <div className='fileUploadCard'>
                {
                    !state.nameFinished &&
                    <div style={{display:'flex', zIndex:'2', width:'100%', height:'100%', position:'absolute', backdropFilter:"blur(2px)", top:"0", left:"0", inset:"0"}}>

                    </div>
                }
                
                <h2 style={{margin:'0px'}}>Add Files</h2>
                {state.portfolioFiles && state.portfolioFiles.length < 2 &&
                    <FileUpload/>
                }
                {state.portfolioFiles && state.portfolioFiles.length > 0 && Array.from(state.portfolioFiles).map((file, index) => (
                    <UploadedFile key={index} index={index} file={file}/>
                ))}
                {state.portfolioFiles && state.portfolioFiles.length == 2 &&
                    <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'end'}}>
                        <div style={{display:'flex', flexDirection:'column', width:'60px', height:'auto'}}>
                            <IconButton aria-label="add portfolio" size="large" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} disabled={state.portfolioFiles.length < 2} onClick={()=> onSetFilesFinished(true)}>
                                <ArrowForwardRoundedIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                            </IconButton>
                        </div>
                    </div>
                }
                </div>
        </Card>
    );
}