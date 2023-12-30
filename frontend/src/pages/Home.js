import 'bootstrap/dist/css/bootstrap.min.css';
import HomeCSS from './home.module.css';
import ort from '../images/ORT_logo.svg';
import calender from '../images/calendar.png';
import user_flat from '../images/abstract-user-flat-4.png';
import { local } from 'd3-selection';
import React, { Component } from 'react';

const b = "{HomeCSS.card-text.h-200}";

function Home() {

    window.addEventListener("beforeunload", function (e) {
        localStorage.clear();
    }, false);

    window.addEventListener('load', localStorage.clear());
    return (


        <>
            <section>
                <div className={HomeCSS.container}>
                    <div className="row d-flex h-100 align-items-center justify-content-center text-center">
                        <div className="card-group">
                            <div className={HomeCSS.card}>
                                <a href="publicSharing/"><img className={HomeCSS.normal_img}
                                    src={ort} height="100px" /></a>
                                <p className={b}>View public sharing board</p>
                            </div>
                            <div className={HomeCSS.card}>
                                <a href="login/"><img className={HomeCSS.tracker_img}
                                    src={calender} height="100px" /></a>
                                <p className={b}>Login to access tracker</p>
                            </div>
                            <div className={HomeCSS.card}>
                                <a href="register/"><img className={HomeCSS.tracker_img}
                                    src={user_flat} height="100px" /></a>
                                <p className={b}>Create an account</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="img-baby-g-about for-desktop" />
            </section></>



    );
}
export default Home;