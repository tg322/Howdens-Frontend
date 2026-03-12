import HomeIcon from '@mui/icons-material/Home';
import { useSidebarDispatchContext, useSidebarStateContext } from './SideBar';
import './layout.scss'

export default function SideBarButton({path, icon, text}){

    const{navigateTo} = useSidebarDispatchContext();
    const{pathname} = useSidebarStateContext();

    return(
        <div className={`sideBarButton${pathname.includes(path) ? ' sideBarButtonActive' : ''}`} onClick={()=>navigateTo(path)}>
            {icon}
            <span>{text}</span>
        </div>
    )
}