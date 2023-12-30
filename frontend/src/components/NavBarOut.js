import React from "react";
import "./base.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

function NavbarOut() {
  return (
    <>
      <header>
        <div id="brand">
          <a href="">
            <FontAwesomeIcon icon={faLeaf} style={{ color: "#A1C298" }} />
            <b> &nbsp; FoodSaviour</b>
          </a>
        </div>
        <div className="nav" id="desktop-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li id="gettingStarted">
              <a href="/faq">FAQ</a>
            </li>
            {/* <li>
              <a href="/directory">Directory</a>
            </li> */}
            <li>
              <a href="/publicSharing">Public Sharing</a>
            </li>
            <li id="login">
              <a href="/login">Login</a>
            </li>
            <li id="signup">
              <a href="/register">
                <Button
                  className="register btn btn-outline-success"
                  variant="outline-success"
                >
                  Register
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <div id="hamburger-icon">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="nav">
          <ul className="mobile-menu">
            <li>
              <a href="{% url 'home' %}">Home</a>
            </li>
            <li>
              <a href="faq/">FAQ</a>
            </li>
            {/* <li>
              <a href="directory/">Directory</a>
            </li> */}
            <li id="login">
              <a href="login/">Login</a>
            </li>
            <li id="signup">
              <a href="register/">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarOut;
