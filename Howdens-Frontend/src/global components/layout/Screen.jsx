import './layout.scss'

export default function Screen({children}){

    return(
        <div id="screen" className="screen">
            {children}
        </div>
    )
}