import './layout.scss'

export default function ContentContainer({children}){

    return(
        <div id="contentContainer" className="contentContainer">
            {children}
        </div>
    )
}