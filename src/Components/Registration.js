import React from 'react';
import '../styles/Registration.css';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Registration = () => {
    return (
        <div className="registration">
            <div className="registrationContent">
                <div className="leftRegContent"></div>
                <form className="rightRegContent">
                    <label id="regLbl">Account Creation</label>
                    <br />
                    <div id="usernameReg">
                        <TextField
                            id="outlined-search"
                            name="username"
                            label="Username"
                            type="search"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required="true"
                        />
                    </div>
                    <div id="emailReg">
                        <TextField
                            id="outlined-search"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required="true"
                        />
                    </div>
                    <div id="passwordReg">
                        <TextField
                            id="outlined-search"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required="true"
                        />
                    </div>
                    <div id="confirmPasswordReg">
                        <TextField
                            id="outlined-search"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required="true"
                        />
                    </div>
                    <div id="nameReg">
                        <TextField
                            id="outlined-search"
                            name="firstName"
                            label="First Name"
                            type="search"
                            variant="outlined"
                            required="true"
                        />
                        <TextField
                            id="outlined-search"
                            name="lastName"
                            label="Last Name"
                            type="search"
                            variant="outlined"
                            required="true"
                        />
                    </div>
                    <div id="regBtn">
                        {<Button variant="contained" color="primary" id="regBtnSubmit">
                            Register
                        </Button>}
                    </div>
                    <div id="signInLink">
                        Do you have an account already?
                        <Typography >
                            <Link href="/" id="signIn">
                                Sign in instead
                            </Link>
                        </Typography>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;

