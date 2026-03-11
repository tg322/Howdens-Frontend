
import Login from '../../page components/login/Login';
import LoginScreen from '../../page components/login/LoginScreen';
import LoginContentContainer from '../../page components/login/LoginContentContainer';
import LoginWrapper from '../../page components/login/LoginWrapper';

export default function LoginPage(){

    return(
        <LoginScreen>
            <LoginWrapper>
                <LoginContentContainer>
                    <Login/>
                </LoginContentContainer>
            </LoginWrapper>
        </LoginScreen>
    )
}