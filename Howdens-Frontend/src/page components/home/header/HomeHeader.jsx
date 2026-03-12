import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


export default function HomeHeader(){

    const navigate = useNavigate();

    return(
        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <h1 style={{fontWeight:'400', margin:'0px'}}>Portfolios</h1>
            <Tooltip title="New Portfolio">
                <IconButton aria-label="add portfolio" size="large" sx={{borderRadius:'8px', height:'fit-content', padding:'4px'}} onClick={()=>navigate('/new_portfolio')}>
                    <AddCircleIcon fontSize="inherit" sx={{color:'#516fd273'}}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}