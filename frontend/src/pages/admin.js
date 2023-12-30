import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'
import axios from 'axios'
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import fourcss from './fourcss.css';
import { local } from 'd3-selection';
import NavbarIn from '../components/NavBarIn';
let temp = [];
let temp_warehouse = [];
let temp_admin = [];
let temp_volunteer = [];
let temp_Sponsor = [];
let temp_Expert = [];

function Admin() {

    const [user, setUser] = useState([]);
    const [approvedUser, setApprovedUser] = useState([]);
    const [declinedUser, setDeclinedUser] = useState([]);


    const fetchData = async () => {
        const response = await fetch("http://localhost:8000/api/adminPull/");
        const data = await response.json();
        return setUser(data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchApprovedData = async () => {
        const response = await fetch("http://localhost:8000/api/adminPullApprove/");
        const data = await response.json();
        return setApprovedUser(data);
    }

    useEffect(() => {
        fetchApprovedData();
    }, [])

    const fetchDeclinedData = async () => {
        const response = await fetch("http://localhost:8000/api/adminPullDecline/");
        const data = await response.json();
        return setDeclinedUser(data);
    }

    useEffect(() => {
        fetchDeclinedData();
    }, [])





    const [CEO, setCEO] = useState({

        role: 'User non-profit managers/CEO',
        metrics: [],
        network: '',
        readwrite: ''

    });
    const [warehouse, setwarehouse] = useState({

        role: 'User non-profit warehouse boss',
        metrics: [],
        network: '',
        readwrite: ''

    });
    const [admin, setAdmin] = useState({

        role: 'Admin',
        metrics: [],
        network: '',
        readwrite: ''

    });

    const [volunteer, setVolunteer] = useState({

        role: 'User non-profit volunteer',
        metrics: [],
        network: '',
        readwrite: ''

    });


    const [Sponsors, setSponsors] = useState({

        role: 'Sponsors',
        metrics: [],
        network: '',
        readwrite: ''

    });

    const [Experts, setExperts] = useState({

        role: 'Experts',
        metrics: [],
        network: '',
        readwrite: ''

    });

    CEO.metrics = CEO.metrics.toString();
    warehouse.metrics = warehouse.metrics.toString();
    admin.metrics = admin.metrics.toString();
    volunteer.metrics = volunteer.metrics.toString();
    Sponsors.metrics = Sponsors.metrics.toString();
    Experts.metrics = Experts.metrics.toString();

    if (new Date().getTime() > localStorage.getItem('expiry')) {
        const response = window.confirm("Your session has expired. Do you still want to be logged in?");

        if (response) {
            localStorage.removeItem('expiry');
            const date = new Date().setHours(new Date().getHours() + 1);
            localStorage.setItem('expiry', date)
        }
    }



    {
        if (new Date().getTime() < localStorage.getItem('expiry')) {


            return (

                <><div id="role-settings-container" className="container-lg col-md-auto">

                    <h3 className="h3">Data Permissions:</h3>
                    <h5 className="h5">Inside Organization: </h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Role</th>
                                <th scope="col">Metric Access</th>
                                <th scope="col">Network Access</th>
                                <th scope="col">Tracker Data Access</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <th scope="row">1</th>
                                <td> User non-profit managers/CEO</td>
                                <td>
                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp.push(e.target.value);
                                                setCEO({ ...CEO, metrics: temp });

                                            } else {
                                                temp.pop(e.target.value);
                                                setCEO({ ...CEO, metrics: temp });

                                            }
                                        }}
                                    >
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="Meat"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Canned Food"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Bread"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Dairy"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-CEO" onChange={(event) =>
                                                setCEO({ ...CEO, network: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-CEO" onChange={(event) =>
                                                setCEO({ ...CEO, readwrite: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No access</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">2</th>
                                <td>User non-profit warehouse boss</td>
                                <td>
                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp_warehouse.push(e.target.value);
                                                setwarehouse({ ...warehouse, metrics: temp_warehouse });


                                            } else {
                                                temp_warehouse.pop(e.target.value);
                                                setwarehouse({ ...warehouse, metrics: temp_warehouse });

                                            }



                                        }}


                                    >
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"
                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="Meat"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Canned Food"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Bread"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Dairy"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-warehouse"

                                                onChange={(event) =>
                                                    setwarehouse({ ...warehouse, network: event.target.value })

                                                }

                                            >
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-warehouse"
                                                onChange={(event) =>
                                                    setwarehouse({ ...warehouse, readwrite: event.target.value })

                                                }
                                            >
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No Access</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">3</th>
                                <td>Admin</td>
                                <td>
                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp_admin.push(e.target.value);
                                                setAdmin({ ...admin, metrics: temp_admin });


                                            } else {
                                                temp_admin.pop(e.target.value);
                                                setAdmin({ ...admin, metrics: temp_admin });

                                            }



                                        }}


                                    >
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"
                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="Meat"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Canned Food"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Bread"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Dairy"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-Admin"

                                                onChange={(event) =>
                                                    setAdmin({ ...admin, network: event.target.value })

                                                }

                                            >
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-Admin"

                                                onChange={(event) =>
                                                    setAdmin({ ...admin, readwrite: event.target.value })

                                                }
                                            >
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No Access</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">4</th>
                                <td>User non-profit volunteer</td>
                                <td>

                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp_volunteer.push(e.target.value);
                                                setVolunteer({ ...volunteer, metrics: temp_volunteer });


                                            } else {
                                                temp_volunteer.pop(e.target.value);
                                                setVolunteer({ ...volunteer, metrics: temp_volunteer });

                                            }
                                        }}
                                    >
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"
                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="Meat"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Canned Food"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Bread"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Dairy"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-CEO" onChange={(event) =>
                                                setVolunteer({ ...volunteer, network: event.target.value })
                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-CEO" onChange={(event) =>
                                                setVolunteer({ ...volunteer, readwrite: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No Access</option>
                                            </select>
                                        </div>
                                    </div>

                                </td>



                            </tr>
                        </tbody>
                    </table>

                    <h5 className="h5">Outside Organization: </h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Role</th>
                                <th scope="col">Metric Access</th>
                                <th scope="col">Network Access</th>
                                <th scope="col">Read/Write Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Sponsors</td>
                                <td>
                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp_Sponsor.push(e.target.value);
                                                setSponsors({ ...Sponsors, metrics: temp_Sponsor });


                                            } else {
                                                temp_Sponsor.pop(e.target.value);
                                                setSponsors({ ...Sponsors, metrics: temp_Sponsor });

                                            }

                                        }}>
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"
                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="Meat"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Canned Food"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Bread"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Dairy"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-Sponsors" onChange={(event) =>
                                                setSponsors({ ...Sponsors, network: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-Sponsors" onChange={(event) =>
                                                setSponsors({ ...Sponsors, readwrite: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No Access</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">2</th>
                                <td>Experts</td>
                                <td>
                                    <div

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                temp_Expert.push(e.target.value);
                                                setExperts({ ...Experts, metrics: temp_Expert });


                                            } else {
                                                temp_Expert.pop(e.target.value);
                                                setExperts({ ...Experts, metrics: temp_Expert });

                                            }

                                        }}>
                                        <div className="form-check">
                                            <input

                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault1"
                                                name="metrics[]"
                                                value="Fresh Produce"
                                            />
                                            <label className="form-check-label" for="flexCheckDefault1">
                                                Fresh Produce
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault2"
                                                name="metrics[]"
                                                value="metric#2"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault2">
                                                Meat
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault3"
                                                name="metrics[]"
                                                value="Metric#3"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault3">
                                                Canned Food
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault4"
                                                name="metrics[]"
                                                value="Metric#4"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault4">
                                                Bread
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault5"
                                                name="metrics[]"
                                                value="Metric#5"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault5">
                                                Dairy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input flexCheckDefault"
                                                type="checkbox"
                                                id="flexCheckDefault6"
                                                name="metrics[]"
                                                value="Reclaimed"

                                            />
                                            <label className="form-check-label" for="flexCheckDefault6">
                                                Reclaimed
                                            </label>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check ">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="network" name="network-Experts" onChange={(event) =>
                                                setExperts({ ...Experts, network: event.target.value })

                                            }>
                                                <option name='empty' value="empty">Choose an option</option>
                                                <option value="allow">Allow</option>
                                                <option value="dont allow">Dont Allow</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <div className="col-md-auto">
                                            <select className="form-select" id="readwrite" name="readwrite-Experts" onChange={(event) =>
                                                setExperts({ ...Experts, readwrite: event.target.value })

                                            }> <option name='empty' value="empty">Choose an option</option>
                                                <option value="both">Full Access</option>
                                                <option value="read">View</option>
                                                <option value="none">No Access</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" for="perms" id='sub' className="btn btn-outline-success"

                        onClick={(e) => {

                            axios.post(
                                "http://127.0.0.1:8000/api/adminInsert/",

                                [
                                    {
                                        role: CEO.role,
                                        metrics: CEO.metrics,
                                        network: CEO.network,
                                        readwrite: CEO.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    },
                                    {
                                        role: warehouse.role,
                                        metrics: warehouse.metrics,
                                        network: warehouse.network,
                                        readwrite: warehouse.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    },
                                    {
                                        role: admin.role,
                                        metrics: admin.metrics,
                                        network: admin.network,
                                        readwrite: admin.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    },
                                    {
                                        role: volunteer.role,
                                        metrics: volunteer.metrics,
                                        network: volunteer.network,
                                        readwrite: volunteer.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    },
                                    {
                                        role: Sponsors.role,
                                        metrics: Sponsors.metrics,
                                        network: Sponsors.network,
                                        readwrite: Sponsors.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    },
                                    {
                                        role: Experts.role,
                                        metrics: Experts.metrics,
                                        network: Experts.network,
                                        readwrite: Experts.readwrite,
                                        Organization: localStorage.getItem('organization')
                                    }
                                ],
                                {
                                    headers: {
                                        "Content-type": "application/json",
                                    }
                                }


                            )

                                .then((response) => {
                                    if (response.status == 201) {
                                        alert("form submitted successfully")
                                        window.location = '/admin'
                                    }
                                })
                                .catch((err) => console.warn(err));
                        }}
                    >Save</button>

                </div>
                    <div id="role-settings-container" className="container-lg col-md-auto">
                        <h3 className="h3"> Pending Accounts:</h3>
                        <table className="table">
                            <thead>
                                <tr>

                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope="col">Agree to Share Data</th>
                                </tr>
                            </thead>

                            <tbody>


                                {user && user.length > 0 && user.map((userObj, index) => (
                                    userObj.Organization === localStorage.getItem('organization') ? (
                                        <tr tr >

                                            <td>{userObj.FirstName}  {userObj.LastName} </td>
                                            <td>{userObj.Email}</td>
                                            <td id='roles'>{userObj.Roles}</td>
                                            <td>
                                                <div className="form-check ">
                                                    <div className="col-md-auto">
                                                        <select className="form-select" id="approve_user" name="approve[]"


                                                            onChange={async (e) => {
                                                                const currentScrollPos = window.scrollY;

                                                                window.location.reload();

                                                                window.scrollTo(0, currentScrollPos);

                                                                axios.put(
                                                                    `http://127.0.0.1:8000/api/adminUpdate/${userObj.id}`,


                                                                    { "Approve": e.target.value },
                                                                    {
                                                                        headers: {
                                                                            "Content-type": "application/json",
                                                                        }
                                                                    }
                                                                )

                                                                const response = await fetch("http://localhost:8000/api/adminPull/");
                                                                const data = await response.json();
                                                                setUser(data);
                                                                fetchData();

                                                                const response2 = await fetch("http://localhost:8000/api/adminPullApprove/");
                                                                const data2 = await response2.json();
                                                                setApprovedUser(data2);
                                                                fetchApprovedData();

                                                                const response3 = await fetch("http://localhost:8000/api/adminPullDecline/");
                                                                const data3 = await response3.json();
                                                                setDeclinedUser(data3);
                                                                fetchDeclinedData();
                                                            }}
                                                        >

                                                            <option name='empty' value="empty">Choose an option</option>
                                                            <option name='approve' value="approve">Accept</option>
                                                            <option name='decline' value="decline">Decline</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}

                            </tbody>
                        </table>
                    </div >



                    <div id="role-settings-container" className="container-lg col-md-auto">
                        <h3 className="h3">Approved Accounts:</h3>
                        <table className="table">
                            <thead>
                                <tr>

                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>

                            <tbody>

                                {approvedUser && approvedUser.length > 0 && approvedUser.map((userObj, index) => (
                                    userObj.Organization === localStorage.getItem('organization') ? (
                                        <tr>

                                            <td>{userObj.FirstName}  {userObj.LastName} </td>
                                            <td>{userObj.Email}</td>
                                            <td id='roles'>{userObj.Roles}</td>
                                            <td><Button className='btn btn-outline-success' variant='btn-outline-sucess'

                                                onClick={async (e) => {

                                                    const currentScrollPos = window.scrollY;

                                                    window.location.reload();

                                                    window.scrollTo(0, currentScrollPos);

                                                    axios.put(
                                                        `http://127.0.0.1:8000/api/adminUpdate/${userObj.id}`,


                                                        { "Approve": null },
                                                        {
                                                            headers: {
                                                                "Content-type": "application/json",
                                                            }
                                                        }
                                                    )

                                                    const response = await fetch("http://localhost:8000/api/adminPull/");
                                                    const data = await response.json();
                                                    setUser(data);
                                                    fetchData();

                                                    const response2 = await fetch("http://localhost:8000/api/adminPullApprove/");
                                                    const data2 = await response2.json();
                                                    setApprovedUser(data2);
                                                    fetchApprovedData();

                                                    const response3 = await fetch("http://localhost:8000/api/adminPullDecline/");
                                                    const data3 = await response3.json();
                                                    setDeclinedUser(data3);
                                                    fetchDeclinedData();
                                                }}



                                            > Revert </Button></td>
                                        </tr>
                                    ) : null
                                ))}

                            </tbody>
                        </table>
                    </div >


                    <div id="role-settings-container" className="container-lg col-md-auto">
                        <h3 className="h3">Declined Accounts:</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>

                            <tbody>

                                {declinedUser && declinedUser.length > 0 && declinedUser.map((userObj, index) => (
                                    userObj.Organization === localStorage.getItem('organization') ? (
                                        <tr>

                                            <td>{userObj.FirstName}  {userObj.LastName} </td>
                                            <td>{userObj.Email}</td>
                                            <td id='roles'>{userObj.Roles}</td>
                                            <td><Button className='btn btn-outline-success' variant='btn-outline-sucess'

                                                onClick={async (e) => {

                                                    const currentScrollPos = window.scrollY;

                                                    window.location.reload();

                                                    window.scrollTo(0, currentScrollPos);


                                                    axios.put(
                                                        `http://127.0.0.1:8000/api/adminUpdate/${userObj.id}`,


                                                        { "Approve": null },
                                                        {
                                                            headers: {
                                                                "Content-type": "application/json",
                                                            }
                                                        }
                                                    )

                                                    const response = await fetch("http://localhost:8000/api/adminPull/");
                                                    const data = await response.json();
                                                    setUser(data);
                                                    fetchData();

                                                    const response2 = await fetch("http://localhost:8000/api/adminPullApprove/");
                                                    const data2 = await response2.json();
                                                    setApprovedUser(data2);
                                                    fetchApprovedData();

                                                    const response3 = await fetch("http://localhost:8000/api/adminPullDecline/");
                                                    const data3 = await response3.json();
                                                    setDeclinedUser(data3);
                                                    fetchDeclinedData();
                                                }}

                                            > Revert </Button></td>
                                        </tr>
                                    ) : null
                                ))}

                            </tbody>
                        </table>
                    </div >



                </>

            );
        }

        else if (new Date().getTime() > localStorage.getItem('expiry')) {

            return (
                <section>
                    <div className="flex-container">
                        <div className="text-center">
                            <h1 className="heading1">
                                <span className="fade-in" id="digit1">4</span>
                                <span className="fade-in" id="digit2">0</span>
                                <span className="fade-in" id="digit3">4</span>
                            </h1>
                            <h3 className=" heading3 fadeIn">YOU MUST LOGIN TO VIEW THIS PAGE</h3>
                            <a href='/login'><Button type="button" class='btn btn-primary ' name="button"> Login</Button ></a >
                        </div >
                    </div >
                </section >
            );

        }
    }

}

export default Admin;