import HowdensLogo from '../../assets/howden-logo.png'
import './layout.scss'

export default function SideBarLogo(){
    return(
        <div className='sideBarLogo'>
            <img src={HowdensLogo} className="logo"/>
        </div>
    );
}