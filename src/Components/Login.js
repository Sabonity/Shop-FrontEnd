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

const Login = () => {
    const [userAccount, setUserAccount] = useState({
        userName: "",
        password: ""
    })

    //Login function 
    const loginUserAccount = async e => {
        e.preventDefault();
        console.log(userAccount);
        try {
            const requestLogin = await axios.post('http://localhost:5000/login', userAccount);
            let { data } = requestLogin;
            let { message } = data;
            Swal.fire({
                icon: 'success',
                title: 'Congrats',
                text: `${message}`
            });
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error);
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                const { message } = error.response.data;
                Swal.fire({
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
            console.log(error.config);
        }
        // axios.post('http://localhost:5000/login', userAccount)
        //     .then(response => {
        //         console.log("Success : " + response);
        //         let { data } = response;
        //         let { message } = data;
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Congrats',
        //             text: `${message}`
        //         });
        //     })
        //     .catch(error => {
        //         console.log("Error : " + error);
        //         // let { data } = error;
        //         // let { message } = data;
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Congrats'
        //         });
        //         console.log(error.data);
        //     });

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

