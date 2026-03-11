import './layout.scss'

export default function Wrapper({children}){

    return(
        <div id="wrapper" className="wrapper">
            {children}
        </div>
    )
}