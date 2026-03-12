import HowdensLogo from '../../assets/howden-logo.png'

export default function SideBarLogo(){
    return(
        <div style={{display:'flex', flexDirection:'column', height:'70px', width:'100%', justifyContent:'center', alignItems:'center'}}>
            <img src={HowdensLogo} style={{maxHeight:'50px', width:'auto', filter: 'brightness(0) saturate(100%)'}}/>
        </div>
    );
}