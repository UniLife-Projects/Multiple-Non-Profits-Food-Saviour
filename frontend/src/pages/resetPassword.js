import 'bootstrap/dist/css/bootstrap.min.css';
import resetCSS from './resetPassword.module.css';
import Button from 'react-bootstrap/Button';
//import { Form } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import axios, { all } from "axios";
import Confetti from 'react-confetti';

function ResetPassword() {

    const [formData, setFormData] = useState({
        Email: "",

    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (

        <>
            <section>
                <div className={resetCSS.body}>
                    <div className={resetCSS.form_container}>
                        {isSubmitted ? (
                            <div className={resetCSS.success_container}>
                                <Confetti
                                    numberOfPieces={200}
                                    recycle={false}
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                />
                                <h1 className={resetCSS.success_title}>We have sent you an email with the link to reset your password!</h1><br />
                                <a href="/"><Button className='btn btn-success'>Home</Button></a>
                            </div>
                        ) : (
                            <div className={`form mx-auto bg-white ${resetCSS.form}`}>
                                <h5 className={`form-title ${resetCSS.form_title}`}>Reset Password</h5>

                                <div className={`form-floating email-form ${resetCSS.email_form}`}>
                                    <Form.Control type="email" id="exampleInputEmail1" className="form-control input-text" placeholder="jordan@gmail.com" name="email" onChange={(event) =>
                                        setFormData({ ...formData, Email: event.target.value })
                                    } />
                                    <Form.Label for="exampleInputEmail1" className="form-label input-text">Email:</Form.Label>
                                </div>


                                <Button classname={`resetPassword btn btn-outline-danger reset-button ${resetCSS.reset_button}`} variant="outline-danger" onClick={(e) => {

                                    if (document.getElementById('exampleInputEmail1').value == "") {

                                        e.preventDefault();
                                        window.alert('fields cannot be blank');

                                        document.getElementById('exampleInputEmail1').classList.add('error');


                                    } else {
                                        document.getElementById('exampleInputEmail1').classList.add('success');

                                        var Email = formData.Email;
                                        axios.post(
                                            `http://localhost:8000/api/resetPassword/`,
                                            {
                                                Email: Email
                                            },
                                            {
                                                headers: {
                                                    "Content-type": "application/json",
                                                },
                                            }
                                        )
                                            .then((response) => {
                                                if (response.status == 200) {

                                                    setIsSubmitted(true);
                                                }
                                            })
                                            .catch((err) => console.warn(err));



                                    }



                                }}>Reset</Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default ResetPassword;