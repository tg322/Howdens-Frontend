import HomeHeader from "../../page components/home/header/HomeHeader";
import PortfolioTable from "../../page components/home/portfolio table/PortfolioTable";
import { HomeContext } from "./HomeContext";



export default function Home(){

    return(
        <HomeContext>
            <HomeHeader/>
            <PortfolioTable/>
        </HomeContext>
    )
}