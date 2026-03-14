import { isNumber } from '@mui/x-data-grid/internals';
import './card.scss'

export default function Card({height, children}){



    return(
        <div className="card" style={{maxHeight:`${height? `${height}px` : 'fit-content'}`}}>
            {children}
        </div>
    );
}