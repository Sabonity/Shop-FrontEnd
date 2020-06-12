import React from 'react';
import '../Styles/Login.css';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Login = () => {
    return (
        <div className="login">
            <div className="loginContent">
                <div className="leftLogin">
                    <label id="loginLbl">Log In</label>
                    <br />
                    <label id="descLbl">Log in your account to check and buy our products. <br /> Enjoy shopping.</label>
                    <br />
                    <div id="inputUsername">
                        <TextField
                            id="outlined-search"
                            label="Username"
                            type="search"
                            variant="outlined"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <br />
                    <div id="inputPassword">
                        {<TextField
                            className="inputPassword"
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{ width: '100%' }}
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
                            {<Button variant="contained" color="primary" id="loginPrimaryBtn">
                                Log in
                        </Button>}
                        </div>
                    </div>
                    <br />
                    <div className="signUpText">
                        Doesn't have an account yet?
                        <Typography >
                            <Link href="#" id="createAcct">
                                 Sign up
                            </Link>
                        </Typography>
                    </div>
                </div>
                <div className="rightLogin">

                </div>
            </div>
        </div>
    )

}

export default Login;

