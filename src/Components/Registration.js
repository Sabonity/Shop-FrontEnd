import React, { useState } from 'react';
import '../styles/Registration.css';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const Registration = () => {

    const [registrationData, setRegistrationData] = useState({
        userName: "",
        password: "",
        email: ""
    });
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegChangeData = event => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    }
    const handleUserChangeData = event => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    const hanldeCPassworChange = event => {
        setConfirmPassword(event.target.value);
    }

    const submitRegistration = async event => {
        let regData = registrationData;
        regData.userData = userData;
        event.preventDefault();
        if (regData.password !== confirmPassword) {
            await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: `Password and Confirm password should be the same`
            });
            return;
        }

        try {
            const requestRegistration = await axios.post('http://localhost:5000/register', regData);
            let { message } = requestRegistration.data;
            await Swal.fire({
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
        }
    }

    return (
        <div className="registration">
            <div className="registrationContent">
                <div className="leftRegContent"></div>
                <form className="rightRegContent" onSubmit={submitRegistration}>
                    <label id="regLbl">Account Creation</label>
                    <br />
                    <div id="usernameReg">
                        <TextField
                            id="outlined-search"
                            name="userName"
                            label="Username"
                            type="search"
                            variant="outlined"
                            style={{ width: '100%' }}
                            required
                            onChange={handleRegChangeData}
                            defaultValue={registrationData.userName}
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
                            required
                            onChange={handleRegChangeData}
                            defaultValue={registrationData.email}
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
                            required
                            onChange={handleRegChangeData}
                            defaultValue={registrationData.password}
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
                            required
                            onChange={hanldeCPassworChange}
                            defaultValue={confirmPassword}
                        />
                    </div>
                    <div id="nameReg">
                        <TextField
                            id="outlined-search"
                            name="firstName"
                            label="First Name"
                            type="search"
                            variant="outlined"
                            required
                            onChange={handleUserChangeData}
                            defaultValue={userData.firstName}
                        />
                        <TextField
                            id="outlined-search"
                            name="lastName"
                            label="Last Name"
                            type="search"
                            variant="outlined"
                            required
                            onChange={handleUserChangeData}
                            defaultValue={userData.lastName}
                        />
                    </div>
                    <div id="regBtn">
                        {<Button variant="contained" color="primary" id="regBtnSubmit" type="submit">
                            Register
                        </Button>}
                    </div>
                    <div id="signInLink">
                        Have an account already?
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

