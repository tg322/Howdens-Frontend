import './login.scss'

export default function LoginWrapper({children}){

    return(
        <div id="loginWrapper" className="loginWrapper">
            {children}
        </div>
    )
}