import Screen from "../../global components/layout/Screen";
import SideBarButton from "../../global components/layout/SideBarButton";
import HomeIcon from '@mui/icons-material/Home';
import { SideBar } from "../../global components/layout/SideBar";
import SideBarLogo from "../../global components/layout/SideBarLogo";
import Display from "../../global components/layout/Display";
import NavBar from "../../global components/layout/NavBar";
import LogoutButton from "../../global components/layout/LogoutButton";
import ContentContainer from "./ContentContainer";
import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";
import SideBarButtonsContainer from "./SideBarButtonsContainer";

export default function Layout(){

    return(
        <Screen>
            <SideBar>
                <SideBarLogo/>
                <SideBarButtonsContainer>
                    <SideBarButton text={'Home'} icon={<HomeIcon/>} path="/home"/>
                </SideBarButtonsContainer>
            </SideBar>
            <Display>
                <NavBar>
                    <LogoutButton/>
                </NavBar>
                <ContentContainer>
                    <Wrapper>
                        <Outlet/>
                    </Wrapper>
                </ContentContainer>
            </Display>

        </Screen>
    )
}