import React from "react";
import "./base.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
function NavbarIn() {

    const Email = localStorage.getItem("email");
    const Organization = localStorage.getItem("organization");
    const role = localStorage.getItem("roles");
    const [getPermissions, setPermissions] = useState([]);
    async function fetchPermissionsData() {
        const response = await fetch(`http://127.0.0.1:8000/api/PermissionsPull/?role=${role}&Organization=${Organization}&Email=${Email}`);
        const data = await response.json();
        return setPermissions(data);
    }
    useEffect(() => {

        fetchPermissionsData();

    }, []);


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
                        <li><a href="/tracker" className="nav-link px-3">Tracker</a></li>

                        {(getPermissions && getPermissions.user && (getPermissions.user.Approve === 'approve' && getPermissions.permissions[0] && getPermissions.permissions[0].network === 'allow')) || (getPermissions && getPermissions.user && (getPermissions.user.Approve === 'decline' || getPermissions.user.Approve === null)) ? (
                            <li><a href="/network" className="nav-link px-3">Sharing</a></li>
                        ) : (
                            null
                        )}


                        <li><a href="/admin" className="nav-link px-3">Permissions</a></li>
                        {/*{% endif %}*/}

                        <li><a href="/profile" className="nav-link px-3"><FontAwesomeIcon icon={faUser} />
                            &nbsp; Profile</a></li>
                        <li id="signup">
                            <a href="/">
                                <Button className="register btn btn-outline-success" variant="outline-success" onClick={function () {
                                    window.localStorage.clear();
                                }}>
                                    Logout
                                </Button>
                            </a>
                        </li>
                    </ul>
                </div>

                <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="nav">
                        <ul className="mobile-menu">
                            <li><a href="tracker/" className="nav-link px-3">Tracker</a></li>

                            <li><a href="network/" className="nav-link px-3">Sharing</a></li>



                            <li><a href="admin/" className="nav-link px-3">Permissions</a></li>
                            {/*{% endif %}*/}

                            <li><a href="profile" className="nav-link px-3"><FontAwesomeIcon icon={faUser} />
                                Profile</a></li>
                            <li id="signup">
                                <a href="/">
                                    <Button className="register btn btn-outline-success" variant="outline-success">
                                        Logout
                                    </Button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default NavbarIn;