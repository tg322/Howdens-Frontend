import './login.scss'

export default function LoginContentContainer({children}){

    return(
        <div id="loginContentContainer" className="loginContentContainer">
            {children}
        </div>
    )
}