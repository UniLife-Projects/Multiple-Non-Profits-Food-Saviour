import 'bootstrap/dist/css/bootstrap.min.css';
import loginCSS from './login.module.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function Login() {
  const [loginData, setLoginData] = useState([]);
  return (

    <div className={loginCSS.body}>
      <div className={`form-container ${loginCSS.form_container}`}>
        <div className={`mx-auto bg-white ${loginCSS.form}`} id="login"   >

          <h5 className={`form-title ${loginCSS.form_title}`}>User Login</h5>


          <div className={`form-floating  ${loginCSS.email_form}`}>
            <input type="email" id="exampleInputEmail1" className="form-control input-text" placeholder="jordan@gmail.com" name="email"

              onChange={(event) =>
                setLoginData({ ...loginData, Email: event.target.value })

              }


            />
            <label for="exampleInputEmail1" className={`form-label  ${loginCSS.input_text}`}>Email:</label>
          </div>


          <div className={`form-floating  ${loginCSS.password_form}`}>
            <input type="password" id="exampleInputPassword1" className="form-control input-text" placeholder="e.g. Kiwanuka" name="password"

              onChange={(event) =>
                setLoginData({ ...loginData, Password: event.target.value })

              }
            />
            <label for="exampleInputPassword1" className={`form-label  ${loginCSS.input_text}`}>Password:</label>
          </div>


          <Button className={`btn btn-outline-success ${loginCSS.sign_in}`} variant="outline-success" id="submit" for="login" type="submit"

            onClick={(e) => {
              axios.post(
                "http://127.0.0.1:8000/api/login/",
                {
                  Email: loginData.Email,
                  Password: loginData.Password
                },
                {
                  headers: {
                    "Content-type": "application/json",
                  }
                }
              )
                .then(response => {
                  if (response.status == 200) {
                    console.log(response.data);
                    const date = new Date().setHours(new Date().getHours() + 1);

                    localStorage.setItem('firstname', response.data['data']['firstname']);
                    localStorage.setItem('lastname', response.data['data']['lastname']);
                    localStorage.setItem('email', response.data['data']['email']);
                    localStorage.setItem('roles', response.data['data']['roles']);
                    localStorage.setItem('organization', response.data['data']['organization']);
                    localStorage.setItem('consent', response.data['data']['consent']);
                    localStorage.setItem('approve', response.data['data']['approve']);
                    localStorage.setItem('id', response.data['data']['id']);

                    localStorage.setItem('token', response.data['token'])
                    localStorage.setItem('expiry', date)
                    window.location.replace("http://localhost:3000/tracker/");
                  }
                })
                .catch(err => {
                  if (err.status = "404" && document.getElementById('exampleInputEmail1').value != "" && document.getElementById('exampleInputPassword1').value != "") {
                    window.alert("invalid username or password");
                    document.getElementById('exampleInputEmail1').classList.add('error');
                    document.getElementById('exampleInputPassword1').classList.add('error');
                  }
                }


                );

              if (document.getElementById('exampleInputEmail1').value === "" || document.getElementById('exampleInputPassword1').value === "") {

                window.alert('fields cannot be blank');
                document.getElementById('exampleInputEmail1').classList.add('error');

                document.getElementById('exampleInputPassword1').classList.add('error');

              } else {
                document.getElementById('exampleInputEmail1').classList.add('success');
                document.getElementById('exampleInputPassword1').classList.add('success');
              }



            }}

          >
            Sign in
          </Button>

          <div className={loginCSS.trouble}>
            <span className={`text-muted ${loginCSS.trouble_text}`}>Having trouble signing in?</span>
            <a className={`text-danger ${loginCSS.trouble_reset}`} href="resetPassword/">Reset password</a>
          </div>

          <div className={loginCSS.new_account}>
            <span className={`text-muted ${loginCSS.new_account_text}`}>Don't have an account?</span>
            <a href="/register" className={`text-success ${loginCSS.new_account_text}`}>Create Now &rarr;</a>
          </div>
        </div>
      </div>
    </div>

  );

}

export default Login;