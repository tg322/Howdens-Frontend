import './layout.scss'

export default function NavBar({children}){
    return(
        <div className="navBar">
            {children}
        </div>
    );
}