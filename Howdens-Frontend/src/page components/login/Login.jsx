import './login.scss'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useAuthDispatchContext, useAuthStateContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[showEmailValid, setShowEmailValid] = useState(false);
    const {login} = useAuthDispatchContext();
    const {error, loading, userDetails} = useAuthStateContext();
    const navigate = useNavigate();

    //If user is logged in, navigate to the home page
    useEffect(()=>{
        if(userDetails){
            navigate('/home')
        }
    },[userDetails])

    function validateEmail(email){
        //I am not well versed in regex, this was taken from the internet to aid with validation.
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function onLogin(){
        
        //prepare loginData object
        const loginData = {
            email:email,
            password:password
        }

        //Send to AuthContext login function
        await login(loginData)
        
    }

    //show validation if email is not valid when email input is no longer in focus
    function onClickOffEmail(){
        setShowEmailValid(!validateEmail(email));
    }
    
    return(
        <div id="loginScreenWrapper" className="loginScreenWrapper">
            <div id="loginScreenContainer" className="loginScreenContainer">
                <div id="loginHeaderContainer" className="loginHeaderContainer">
                    <h1>Login</h1>
                    <span>Welcome Back!</span>
                </div>
                <div id="loginFormContainer" className="loginFormContainer">
                    <div id="inputGroup" className='inputGroup'>
                        <InputLabel shrink>Email</InputLabel>
                        <TextField
                            placeholder="john.doe@email.com"
                            variant="outlined"
                            size='small'
                            onChange={handleEmailChange}
                            value={email}
                            type='email'
                            onBlur={onClickOffEmail}
                            disabled={loading}
                        />
                        {showEmailValid && 
                            <span style={{fontSize:'12px', color:'darkred'}}>Not a valid email address.</span>
                        }
                    </div>
                    
                    <div id="inputGroup" className='inputGroup'>
                        <InputLabel shrink>Password</InputLabel>
                        <TextField
                            placeholder="Enter your password"
                            variant="outlined"
                            size='small'
                            onChange={handlePasswordChange}
                            value={password}
                            type='password'
                            disabled={loading}
                        />
                    </div>
                    
                    {error !== '' &&
                        <div id="errorMessageContainer" className="errorMessageContainer">
                            <span style={{fontSize:'12px', color:'darkred'}}>{error}</span>
                        </div>
                    }
                    
                </div>
                <div id="loginButtonContainer" className="loginButtonContainer">
                    <Button sx={{textTransform:'none'}} variant="contained" size='large' disabled={!email || !password || showEmailValid? true : false} onClick={onLogin} loading={loading}>Login</Button>
                </div>
            </div>        
        </div>
    );
}