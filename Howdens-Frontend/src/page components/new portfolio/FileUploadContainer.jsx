import FileUpload from './FileUpload';
import './newPortfolio.scss'
import { useNewPortfolioStateContext } from './NewPortfolio';

export default function FileUploadContainer(){

    const{nameFinished, portfolioFiles} = useNewPortfolioStateContext();

    return(
        <div className='fileUploadCard'>
            {
                !nameFinished &&
                <div style={{display:'flex', zIndex:'2', width:'100%', height:'100%', position:'absolute', backdropFilter:"blur(2px)", top:"0", left:"0", inset:"0"}}>

                </div>
            }
            
            <h2 style={{margin:'0px'}}>Add Files</h2>
            <FileUpload/>
            {portfolioFiles && Array.from(portfolioFiles).map((file, index) => (
                <div key={index} style={{display:'flex', flexDirection:'row', width:'100%', borderRadius:'8px', backgroundColor:'lightgray'}}>
                    <p>{file.name}</p>
                </div>
            ))}
        </div>
    );
}