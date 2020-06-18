/*
 Login Component
*/

import React, { useState } from 'react';
import '../styles/Login.css';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAILED, POST_USER_DATA } from '../actions/isLogged';

const Login = () => {
    const [userAccount, setUserAccount] = useState({
        userName: "",
        password: ""
    });

    const dispatch = useDispatch();

    //Login function 
    const loginUserAccount = async e => {
        e.preventDefault();
        try {
            //API call
            const requestLogin = await axios.post('http://localhost:5000/login', userAccount);
            let { message } = requestLogin.data;
            let { userData } = requestLogin.data;
            let { access } = requestLogin.data;
            let token = requestLogin.headers["auth-token"];
            userData.token = token;
            userData.access = access;
            await Swal.fire({
                icon: 'success',
                title: 'Congrats',
                text: `${message}`
            });
            console.log(requestLogin);
            //Dispatching of action
            dispatch(LOGIN_SUCCESS());
            dispatch(POST_USER_DATA(userData));
            window.location.replace('/product');
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error);
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                const { message } = error.response.data;
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: `${message}`
                });
            } else if (error.request) {
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            dispatch(LOGIN_FAILED());
        }


    }

    const handleChange = async event => {
        setUserAccount({ ...userAccount, [event.target.name]: event.target.value });
    }
    return (
        <div className="login">
            <div className="loginContent">
                <form className="leftLogin" onSubmit={loginUserAccount}>
                    <label id="loginLbl">Hi, Welcome</label>
                    <br />
                    <label id="descLbl">Log in your account to check and buy our products. <br /> Enjoy shopping.</label>
                    <br />
                    <div id="inputUsername">
                        <TextField
                            name="userName"
                            id="outlined-search"
                            label="Username"
                            type="search"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required
                            onChange={handleChange}
                            defaultValue={userAccount.userName}

                        />
                    </div>
                    <br />
                    <div id="inputPassword">
                        {<TextField
                            name="password"
                            className="inputPassword"
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required
                            defaultValue={userAccount.password}
                            onChange={handleChange}
                        />}
                    </div>
                    <br />
                    <div id="loginBtn">
                        <div className="forgotPasswordCtn">
                            <Typography >
                                <Link href="#" >
                                    Forgot password?
                                </Link>
                            </Typography>
                        </div>
                        <div className="loginBtnCtn">
                            <Button variant="contained" color="primary" id="loginPrimaryBtn" type="submit">
                                Log in
                        </Button>
                        </div>
                    </div>
                    <br />
                    <div className="signUpText">
                        Doesn't have an account yet?
                        <Typography >
                            <Link href="/register" id="createAcct">
                                Sign up
                            </Link>
                        </Typography>
                    </div>
                </form>
                <div className="rightLogin">

                </div>
            </div>
        </div>
    )

}

export default Login;

