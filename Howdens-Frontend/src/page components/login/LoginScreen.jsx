import './login.scss'

export default function LoginScreen({children}){

    return(
        <div id="loginScreen" className="loginScreen">
            {children}
        </div>
    )
}