import React, { useState, useEffect } from 'react';
import axios from 'axios';
import resetCSS from './resetPassword.module.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Confetti from 'react-confetti';

function ResetPassword() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [validToken, setValidToken] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setToken(token);
            axios.post('http://localhost:8000/api/verifytoken/', { token: token })
                .then(response => {
                    setEmail(response.data.email);
                    setValidToken(true);
                    setShowForm(true);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(password);
        console.log(confirmPassword);

        if (password === '') {
            event.preventDefault();
            document.getElementById('password').classList.add('error');
        } else if (confirmPassword === '') {
            event.preventDefault();
            document.getElementById('confirmPassword').classList.add('error');
        } else if (password !== confirmPassword) {
            event.preventDefault();
            window.alert('Passwords do not match');
            document.getElementById('password').classList.add('error');
            document.getElementById('confirmPassword').classList.add('error');
        } else {
            axios
                .post(
                    `http://localhost:8000/api/changePassword`,
                    {
                        Email: email,
                        Password: password,
                    },
                    {
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        window.alert(
                            'Password reset successfully, redirecting you to the login page!'
                        );
                        window.location.href = '/login';
                    }
                })
                .catch((err) => console.warn(err));
        }
    };





    if (!validToken) {
        return (
            <div>
                Invalid token.
            </div>
        );
    }

    if (showForm) {
        return (
            <>
                <section>
                    <div className={resetCSS.body}>
                        <div className={resetCSS.form_container}>
                            <div className={`form mx-auto bg-white ${resetCSS.form}`}>
                                <h5 className={`form-title ${resetCSS.form_title}`}>Set New Password</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className={`form-floating email-form ${resetCSS.email_form}`}>
                                        <input className="form-control input-text" type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                        <Form.Label for="password" className="form-label input-text">New Password:</Form.Label>

                                    </div>
                                    <br />
                                    <div className={`form-floating password-form ${resetCSS.email_form}`}>

                                        <input className="form-control input-text" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                                        <Form.Label for="confirmPassword" className="form-label input-text">Confirm Password:</Form.Label>

                                    </div>
                                    <br />
                                    <Button type='submit' classname={`resetPassword btn btn-outline-danger reset-button ${resetCSS.reset_button}`} variant="outline-danger">Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <div>
            Verifying token...
        </div>
    );
}

export default ResetPassword;
