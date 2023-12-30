// Importing React and relevant React hooks
import React, { useState, useRef, useEffect } from "react";
import dateFormat from "dateformat";
// This imports the axios package to communicate with the REST API
import axios from "axios";

// This imports the d3 package to create the pie charts
import * as d3 from "d3";

// This imports the tracker CSS file
import trackerCSS from "./tracker.module.css";
import fourcss from "./fourcss.css";

// Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importing the Form from Bootstrap
import Form from "react-bootstrap/Form";

// Importing the Button from Bootstrap
import Button from "react-bootstrap/Button";

// Importing Table from Bootstrap
import Table from "react-bootstrap/Table";

// This package will add the celebration effect on tracker page
import Confetti from "react-confetti";
import { select } from "d3";

// Importing FontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faSquareCheck, faRectangleXmark } from "@fortawesome/free-solid-svg-icons"; //Edit,Delete icon



function Tracker() {


  if (
    new Date().getTime() < localStorage.getItem("expiry")

  ) {
    const Email = localStorage.getItem("email");
    const Organization = localStorage.getItem("organization");
    const role = localStorage.getItem("roles");
    const [getPermissions, setPermissions] = useState([]);
    async function fetchPermissionsData() {
      const response = await fetch(`http://127.0.0.1:8000/api/PermissionsPull/?role=${encodeURIComponent(role)}&Organization=${encodeURIComponent(Organization)}&Email=${Email}`);
      const data = await response.json();
      return setPermissions(data);
    }



    const [getData, setData] = useState([]);
    const [getPercentageData, setPercentageData] = useState([]);
    const [getCategoryData, setCategoryData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    const onConfettiComplete = () => {
      setIsRunning(false); // stop the animation
    };
    const [trackers, setTrackers] = useState({
      Category: "Fresh Produce",
      Description: "",
      Quantity: "",
      Qunits: "lb",
      amountToClients: "",
      amountToAFeed: "",
      amountToCompost: "",
      amountToPartnerNetwork: "",
      Email: "",
      Organization: "",
    });
    const [trackers_edit, setEditTrackers] = useState({
      Category: "Fresh Produce",
      Description: "",
      Quantity: "",
      Qunits: "lb",
      amountToClients: "",
      amountToAFeed: "",
      amountToCompost: "",
      amountToPartnerNetwork: "",
      amountToLandfill: "",
    });

    const quantity = useRef();
    const clients = useRef();
    const animalFeed = useRef();
    const compost = useRef();
    const partnerNetwork = useRef();
    const landFill = useRef();

    const percentClients = useRef();
    const percentAnimalFeed = useRef();
    const percentCompost = useRef();
    const percentPartnerNetwork = useRef();
    const percentLandFill = useRef();

    const percentagePieChartRef = useRef(null);
    const categoryPieChartRef = useRef(null);

    useEffect(() => {
      fetchData();
      fetchPercentageChartData();
      fetchCategoryChartData();
      fetchPermissionsData();
      fetchPermissionsData();
      // setInterval(calculateLandFillPercent(), 500);
      const interval = setInterval(function () {
        calculateLandFillAndPercentsWrapper();
      }, 500);
      return () => clearInterval(interval);
    }, []);


    function PercentagePieChart({ data }) {
      // const labelOffset = 100;
      if (!data || Object.keys(data).length === 0) {
        return <h1>No Data Found</h1>;
      }

      useEffect(() => {
        d3.select("#percentage-pie-chart").selectAll("svg").remove();
        const width = 650;
        const height = 400;
        const margin = 50;

        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3
          .select(percentagePieChartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

        const data = { ...getPercentageData };

        const dataEntries = Object.entries(data).filter(entry => entry[1] !== 0.00);;

        const color = d3
          .scaleOrdinal()
          // .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
          // .domain(Object.keys(data))
          .domain(dataEntries.map((entry) => entry[0]))
          .range(d3.schemeDark2);

        const pie = d3
          .pie()
          .sort(null)
          .value((d) => d[1]);

        const data_ready = pie(Object.entries(data));

        const arc = d3
          .arc()
          .innerRadius(radius * 0.5) // This is the size of the donut hole
          .outerRadius(radius * 0.8);

        const outerArc = d3
          .arc()
          .innerRadius(radius * 0.8)
          .outerRadius(radius * 0.8);

        svg
          .selectAll("allSlices")
          .data(data_ready)
          .join("path")
          .attr("d", arc)
          .attr("fill", (d) => color(d.data[0]))
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);

        svg
          .selectAll("allPolylines")
          .data(data_ready)
          .join("polyline")
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr("points", function (d) {
            const posA = arc.centroid(d); // line insertion in the slice
            const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            const posC = outerArc.centroid(d); // Label position = almost the same as posB
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.8 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(data_ready)
          .join("text")
          .text((d) => d.data[0])
          .attr("transform", function (d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.81 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          })
          .style("text-anchor", function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          })
          .style("font-size", "1rem");

        return () => {
          // svg.remove();
          d3.select("#percentage-pie-chart").selectAll("svg").remove();
        };
      }, [data]);
    }

    function CategoryPieChart({ data }) {
      if (!data || Object.keys(data).length === 0) {
        return <h1>No Data Found</h1>;
      }
      useEffect(() => {
        d3.select("#category-pie-chart").selectAll("svg").remove();
        const width = 600;
        const height = 400;
        const margin = 50;

        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3
          .select(categoryPieChartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

        const filteredData = Object.entries(data).filter((entry) => entry[1] !== 0.0);

        const color = d3
          .scaleOrdinal()
          .domain(filteredData.map((entry) => entry[0]))
          .range(d3.schemeDark2);

        const pie = d3
          .pie()
          .sort(null)
          .value((d) => d[1]);

        const data_ready = pie(filteredData);

        const arc = d3
          .arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.8);

        const outerArc = d3
          .arc()
          .innerRadius(radius * 0.8)
          .outerRadius(radius * 0.8);

        svg
          .selectAll("allSlices")
          .data(data_ready)
          .join("path")
          .attr("d", arc)
          .attr("fill", (d) => color(d.data[0]))
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);

        svg
          .selectAll("allPolylines")
          .data(data_ready)
          .join("polyline")
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr("points", function (d) {
            const posA = arc.centroid(d);
            const posB = outerArc.centroid(d);
            const posC = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.8 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(data_ready)
          .join("text")
          .text((d) => d.data[0])
          .attr("transform", function (d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.81 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          })
          .style("text-anchor", function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          })
          .style("font-size", "1rem");

        return () => {
          d3.select("#category-pie-chart").selectAll("svg").remove();
        };
      }, [data]);
    }

    function calculateLandFillEdit() {
      if (document.getElementById('quantity-edit')) {
        var total = parseFloat(document.getElementById('quantity-edit').value);
        total = total ? total : 0;
        var num1 = parseFloat(document.getElementById('clients-edit').value);
        num1 = num1 ? num1 : 0.0;
        var num2 = parseFloat(document.getElementById('animalFeed-edit').value);
        num2 = num2 ? num2 : 0.0;
        var num3 = parseFloat(document.getElementById('compost-edit').value);
        num3 = num3 ? num3 : 0;
        var num4 = parseFloat(document.getElementById('partnerNetwork-edit').value);
        num4 = num4 ? num4 : 0;
        return (total - (num1 + num2 + num3 + num4));
      }
    }

    const [editingRow, setEditingRow] = useState(null);
    const [editable, setEditable] = useState(0);
    async function handleEdit(id) {
      setEditable(id);
      setEditingRow(id);
    }

    function defaultValue() {
      setEditable(0);
      setEditingRow(null);
    }


    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/trackerPull/?Email=${Email}&Organization=${encodeURIComponent(Organization)}&role=${encodeURIComponent(role)}`);
      const data = await response.json();
      return setData(data);
    }


    async function fetchPercentageChartData() {
      const response = await fetch(
        `http://localhost:8000/api/trackerPercentageSum/?Email=${Email}&Organization=${encodeURIComponent(Organization)}&role=${encodeURIComponent(role)}`
      );
      const data = await response.json();

      let clientValue = data["percentClients__sum"].toFixed(2);
      let compostValue = data["percentCompost__sum"].toFixed(2);
      let feedValue = data["percentAFeed__sum"].toFixed(2);
      let landFillValue = data["percentLandfill__sum"].toFixed(2);
      let partnerNetworkValue = data["percentPartNet__sum"].toFixed(2);


      let total =
        parseFloat(clientValue) +
        parseFloat(compostValue) +
        parseFloat(feedValue) +
        parseFloat(landFillValue) +
        parseFloat(partnerNetworkValue);

      let clientKey = `Clients: ${((clientValue * 100) / total).toFixed(1)} %`;
      let compostKey = `Compost: ${((compostValue * 100) / total).toFixed(2)} %`;
      let feedKey = `Feed: ${((feedValue * 100) / total).toFixed(2)} %`;
      let landFillKey = `Landfill: ${((landFillValue * 100) / total).toFixed(
        2
      )} %`;
      let partnerNetworkKey = `Partner Network: ${(
        (partnerNetworkValue * 100) /
        total
      ).toFixed(2)} %`;

      const data2 = {
        [clientKey]: clientValue,
        [compostKey]: compostValue,
        [feedKey]: feedValue,
        [landFillKey]: landFillValue,
        [partnerNetworkKey]: partnerNetworkValue,
      };

      return setPercentageData(data2);
    }

    async function fetchCategoryChartData() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/trackerCategorySum/?Email=${Email}&Organization=${Organization}&role=${role}`
        );
        const data = await response.json();

        let data2 = {};

        for (let key in data) {
          let value = parseFloat(data[key]);
          if (!isNaN(value)) {
            data2[`${key}: ${value.toFixed(2)}`] = value;
          }
        }

        return setCategoryData(data2);
      } catch (error) {
        console.error("Error fetching category chart data:", error);
      }
    }


    function calculateLandFillAndPercentsWrapper() {
      calculateLandFill();
      calculatePercent();
      calculateLandFillPercent();
    }

    function calculateLandFill() {
      const sum =
        Number(clients.current.value) +
        Number(animalFeed.current.value) +
        Number(compost.current.value) +
        Number(partnerNetwork.current.value);
      const diff = Number(quantity.current.value) - Number(sum);

      landFill.current.value = Number(diff);
    }

    function calculateLandFillPercent() {
      const sum =
        Number(percentClients.current.value) +
        Number(percentAnimalFeed.current.value) +
        Number(percentCompost.current.value) +
        Number(percentPartnerNetwork.current.value);

      const diff = 100 - Number(sum);

      percentLandFill.current.value = Number(diff).toFixed(2);
    }

    function calculatePercent() {
      percentClients.current.value = (
        Number(Number(clients.current.value) / Number(quantity.current.value)) *
        100
      ).toFixed(2);
      percentAnimalFeed.current.value = (
        Number(
          Number(animalFeed.current.value) / Number(quantity.current.value)
        ) * 100
      ).toFixed(2);
      percentCompost.current.value = (
        Number(Number(compost.current.value) / Number(quantity.current.value)) *
        100
      ).toFixed(2);
      percentPartnerNetwork.current.value = (
        Number(
          Number(partnerNetwork.current.value) / Number(quantity.current.value)
        ) * 100
      ).toFixed(2);
    }

    // Downloading CSV
    function downloadCSV(csv, filename) {
      const csvFile = new Blob([csv], { type: "text/csv" });
      const downloadLink = document.createElement("a");

      downloadLink.download = filename;
      downloadLink.href = window.URL.createObjectURL(csvFile);

      downloadLink.style.display = "none";

      document.body.appendChild(downloadLink);
      downloadLink.click();
    }

    // Exporting Table to CSV
    function exportTableToCSV(filename) {
      let csv = [];
      const rows = document.querySelectorAll("table tr");

      for (let i = 0; i < rows.length; i++) {
        let row = [];
        const cols = rows[i].querySelectorAll("td, th");

        for (let j = 0; j < cols.length - 1; j++) {
          row.push(cols[j].innerText);
        }

        csv.push(row.join(","));
      }

      downloadCSV(csv.join("\n"), filename);
    }

    var trackerData = JSON.stringify(trackers);
    if (
      new Date().getTime() > localStorage.getItem("expiry")
    ) {
      const response = window.confirm(
        "Your session has expired. Do you still want to be logged in?"
      );

      if (response) {
        localStorage.removeItem("expiry");
        const date = new Date().setHours(new Date().getHours() + 1);
        localStorage.setItem("expiry", date);
      }
    }

    {

      return (
        <div className={isSubmitted ? "confetti-container" : ""}>
          <div className="container p-2" id="container">
            <p><strong>Welcome, {localStorage.getItem("firstname")}!</strong></p>

            <div className={`card ${trackerCSS["tracker-card-div"]} m-0`}>
              <div className={`${trackerCSS["card-header"]} card-header`}>
                <h3>Enter tracker data:</h3>
              </div>
              <div className="card-body">
                <div id="form-wrapper">
                  <div className="tracker-data-entry" id="tracker">
                    <Form.Group>
                      {/* {% csrf_token %} */}
                      <div className="row">
                        <div className="col-md-auto">
                          <label htmlFor="category">Category</label>
                          <br />
                          <select
                            className="form-select"
                            id="category"
                            name="category"
                            onChange={(event) => {
                              setTrackers({
                                ...trackers,
                                Category: event.target.value,

                              });
                            }}
                            disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}


                          >
                            <option selected>Fresh Produce</option>
                            <option>Meat</option>
                            <option>Canned Food</option>
                            <option>Bread</option>
                            <option>Dairy</option>
                            <option>Reclaimed</option>
                          </select>
                        </div>
                        <div className="col-md-auto">
                          <label htmlFor="description">Description</label>
                          <br />
                          <input
                            type="text"
                            id="description"
                            className={`form-control input-text ${trackerCSS["customised-input"]}`}
                            placeholder=""
                            name="description"
                            onChange={(event) => {
                              setTrackers({
                                ...trackers,
                                Description: event.target.value,
                              });
                            }}
                            disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}

                          />
                        </div>
                        <div className="col-md-auto">
                          <label htmlFor="quantity">Quantity</label>
                          <br />
                          <input
                            type={`text`}
                            id="quantity"
                            className={`form-control input-text ${trackerCSS["customised-input"]}`}
                            placeholder=""
                            name="quantity"
                            ref={quantity}
                            onKeyUp={calculateLandFillAndPercentsWrapper}
                            onChange={(event) => {
                              setTrackers({
                                ...trackers,
                                Quantity: event.target.value,
                              });
                            }}
                            disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))} />

                        </div>
                        <div className="col-md-auto">
                          <label htmlFor="qunits">Units</label>
                          <br />
                          <select
                            className="form-select"
                            id="qunits"
                            name="qunits"
                            onChange={(event) => {
                              setTrackers({
                                ...trackers,
                                Qunits: event.target.value,
                              });
                            }}
                            disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}

                          >
                            <option selected>lbs</option>
                            <option>kgs</option>
                          </select>
                        </div>
                        <div className="col-auto">
                          <div className="row">
                            <div className="col-auto">
                              <label htmlFor="amount">Amount Diverted To</label>
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col-auto">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-input"]}`}
                                id="clients"
                                name="clients"
                                ref={clients}
                                min={0}
                                // style={{ width: "10em" }}
                                onKeyUp={calculateLandFillAndPercentsWrapper}
                                // onkeyup="calculateLandfill(); calculatePercent()
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    amountToClients: event.target.value,
                                  });
                                }}
                                disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}

                              />
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col-auto">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-input"]}`}
                                id="animalFeed"
                                name="animalFeed"
                                ref={animalFeed}
                                min={0}
                                onKeyUp={calculateLandFillAndPercentsWrapper}
                                // onkeyup="calculateLandfill(); calculatePercent()"
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    amountToAFeed: event.target.value,
                                  });
                                }} disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}
                              />
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col-auto">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-input"]}`}
                                id="compost"
                                name="compost"
                                ref={compost}
                                min={0}
                                onKeyUp={calculateLandFillAndPercentsWrapper}
                                // onkeyup="calculateLandfill(); calculatePercent()"
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    amountToCompost: event.target.value,
                                  });
                                }} disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}
                              />
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col-auto">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-input"]}`}
                                id="partnerNetwork"
                                name="partnerNetwork"
                                ref={partnerNetwork}
                                min={0}
                                onKeyUp={calculateLandFillAndPercentsWrapper}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    amountToPartnerNetwork: event.target.value,
                                  });
                                }} disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}
                              />
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col-auto">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-input"]}`}
                                id="landFill"
                                name="landFill"
                                ref={landFill}
                                min={0}
                                readonly="readonly"
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    amountToLandfill: event.target.value,
                                  });
                                }} />
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div className="col">
                              <label htmlFor="percent">% <small style={{ color: "red" }}>(These values are auto-calculated)</small></label>
                              <br />
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                id="percentClients"
                                name="percentClients"
                                ref={percentClients}
                                min={0}
                                value={0}
                                max={100}
                                onLoad={calculateLandFillPercent}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    percentClients: event.target.value,
                                  });
                                }}
                                // onLoad={() => calculateLandfillPercent()}
                                // onload="calculateLandfillPercent()"
                                readonly="readonly" />
                            </div>
                            <div className="col d-flex align-items-center">
                              Clients
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                id="percentAnimalFeed"
                                name="percentAnimalFeed"
                                ref={percentAnimalFeed}
                                min={0}
                                value={0}
                                max={100}
                                onLoad={calculateLandFillPercent}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    percentAFeed: event.target.value,
                                  });
                                }}
                                // onLoad={() => calculateLandfillPercent()}
                                // onload="calculateLandfillPercent()"
                                readonly="readonly" />
                            </div>
                            <div className="col d-flex align-items-center">
                              Animal Feed
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                id="percentCompost"
                                name="percentCompost"
                                ref={percentCompost}
                                min={0}
                                value={0}
                                max={100}
                                onLoad={calculateLandFillPercent}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    percentCompost: event.target.value,
                                  });
                                }}
                                // onLoad={() => calculateLandfillPercent()}
                                // onload="calculateLandfillPercent()"
                                readonly="readonly" />
                            </div>
                            <div className="col d-flex align-items-center">
                              Compost / Fertilizer
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                id="percentPartnerNetwork"
                                name="percentPartnerNetwork"
                                ref={percentPartnerNetwork}
                                min={0}
                                value={0}
                                max={100}
                                onLoad={calculateLandFillPercent}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    percentPartNet: event.target.value,
                                  });
                                }}
                                // onLoad={() => calculateLandfillPercent()}
                                // onLoad="calculateLandfillPercent()"
                                readonly="readonly" />
                            </div>
                            <div className="col d-flex align-items-center">
                              Partner Network
                            </div>
                          </div>
                          <div className="row pb-2">
                            <div className="col">
                              <input
                                type="number"
                                step="any"
                                className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                id="percentLandFill"
                                name="percentLandFill"
                                ref={percentLandFill}
                                value={100}
                                onChange={(event) => {
                                  setTrackers({
                                    ...trackers,
                                    percentLandfill: event.target.value,
                                  });
                                }}
                                readonly="readonly" />
                            </div>
                            <div className="col d-flex align-items-center">
                              Landfill
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="">
                          <Button
                            variant="outline-success"
                            className={`${trackerCSS["save"]} btn btn-outline-success`}
                            id="submit"
                            onClick={(e) => {
                              axios.post(
                                "http://127.0.0.1:8000/api/trackerInsert/",
                                {
                                  Category: trackers.Category,
                                  Description: trackers.Description,
                                  Quantity: parseFloat(trackers.Quantity),
                                  Qunits: trackers.Qunits,
                                  amountToClients: parseFloat(trackers.amountToClients),
                                  amountToAFeed: parseFloat(trackers.amountToAFeed),
                                  amountToCompost: parseFloat(trackers.amountToCompost),
                                  amountToPartNet: parseFloat(trackers.amountToPartnerNetwork),
                                  amountToLandfill: parseFloat(document.getElementById("landFill").value),
                                  percentClients: parseFloat(document.getElementById("percentClients").value),
                                  percentAFeed: parseFloat(document.getElementById("percentAnimalFeed").value),
                                  percentCompost: parseFloat(document.getElementById("percentCompost").value),
                                  percentPartNet: parseFloat(document.getElementById("percentPartnerNetwork").value),
                                  percentLandfill: parseFloat(document.getElementById("percentLandFill").value),
                                  Email: localStorage.getItem("email"),
                                  Organization: (getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') ? localStorage.getItem("organization") : "none",
                                },
                                {
                                  headers: {
                                    "Content-type": "application/json",
                                  },
                                }
                              )
                                .then((response) => {
                                  if (response.status == 201) {
                                    setIsSubmitted(true);
                                    fetchData();
                                    fetchPercentageChartData();
                                    fetchCategoryChartData();
                                  }
                                })
                                .catch((err) => console.warn(err));
                            }}
                            disabled={(getPermissions && getPermissions.user && getPermissions.user.Approve === 'approve') && (getPermissions.permissions && getPermissions.permissions.length > 0 && (getPermissions.permissions[0].readwrite === 'read' || getPermissions.permissions[0].readwrite === 'none'))}

                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div><br />

            {(getPermissions && getPermissions.user && (getPermissions.user.Approve === 'approve' && getPermissions.permissions[0] && getPermissions.permissions[0].readwrite != 'none')) || (getPermissions && getPermissions.user && (getPermissions.user.Approve === 'decline' || getPermissions.user.Approve === null)) ? (
              <><div className={`card ${trackerCSS["pie-chart-outer-div"]}`}>

                <h3>Graphs</h3>

                <div
                  className={`col-6 svg-container ${trackerCSS["pie-chart-inner-div"]}`}
                  id="percentage-pie-chart"
                  ref={percentagePieChartRef}
                >
                  <PercentagePieChart data={getPercentageData} />
                </div>
                <div
                  className={`col-6 svg-container ${trackerCSS["pie-chart-inner-div"]}`}
                  id="category-pie-chart"
                  ref={categoryPieChartRef}
                >
                  <CategoryPieChart data={getCategoryData} />
                </div>
              </div><br /></>
            ) : null}
            {(getPermissions && getPermissions.user && (getPermissions.user.Approve === 'approve' && getPermissions.permissions[0] && getPermissions.permissions[0].readwrite != 'none')) || (getPermissions && getPermissions.user && (getPermissions.user.Approve === 'decline' || getPermissions.user.Approve === null)) ? (
              <><section id="section" className={`${trackerCSS["database-table"]}`}>
                <div className="card">
                  <div className={`${trackerCSS["card-header"]} card-header`}>
                    <h3>Database</h3>
                    <Button
                      type="button"
                      variant="outline-success"
                      className={`${trackerCSS["export"]} btn btn-success-outline`}
                      onClick={function () {
                        exportTableToCSV(
                          `tracker-data-${dateFormat(
                            new Date(),
                            "mmmm dS, yyyy, hh:mm"
                          )}.csv`
                        );
                      }}
                    >
                      Export CSV
                    </Button>
                  </div>
                  <div className="card-body">
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      id="data-table"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Units</th>
                          <th>Clients</th>
                          <th>Animal Feed</th>
                          <th>Compost</th>
                          <th>Partner Network</th>
                          <th>Landfill</th>
                          <th>Date</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {


                          getData &&
                          getData.length > 0 &&
                          getData.map((userObj) => (
                            (getPermissions && getPermissions.user && (getPermissions.user.Approve === 'approve' && getPermissions.permissions[0] && getPermissions.permissions[0].metrics.includes(userObj.Category))) || (getPermissions && getPermissions.user && (getPermissions.user.Approve === 'decline' || getPermissions.user.Approve === null)) ? (
                              <tr>
                                <td>
                                  {editingRow === userObj.id ? (
                                    <select
                                      className={`form-control input-text ${trackerCSS["customised-smaller-input"]}`}
                                      id="category"

                                      name="category"
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          Category: event.target.value,
                                        });
                                      }}
                                    >
                                      <option>Fresh Produce</option>
                                      <option>Meat</option>
                                      <option>Canned Food</option>
                                      <option>Bread</option>
                                      <option>Dairy</option>
                                      <option>Reclaimed</option>
                                    </select>
                                  ) : (
                                    userObj.Category
                                  )}

                                </td>
                                <td>
                                  {editingRow === userObj.id ? (
                                    <textarea
                                      type="text"
                                      id="description-edit"
                                      className={`form-control input-text ${trackerCSS["customised-smaller-input"]}`}
                                      placeholder={userObj.Description}
                                      name="description-edit"
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          Description: event.target.value,
                                        });
                                      }} />) : (

                                    userObj.Description)}
                                </td>
                                <td>
                                  {editingRow === userObj.id ? (

                                    <input
                                      type={`text`}
                                      id="quantity-edit"
                                      className={`form-control input-text ${trackerCSS["customised-smaller-input"]}`}
                                      placeholder={userObj.Quantity}
                                      name="quantity-edit"
                                      onKeyUp={calculateLandFillAndPercentsWrapper}
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          Quantity: event.target.value,
                                        });
                                        calculateLandFillEdit();
                                      }} />


                                  ) : (
                                    userObj.Quantity
                                  )}

                                </td>
                                <td>
                                  {editingRow === userObj.id ? (

                                    <select
                                      className="form-select"
                                      id="qunits-edit"
                                      name="qunits-edit"
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          Qunits: event.target.value,
                                        });
                                      }}
                                    >
                                      <option selected>lbs</option>
                                      <option>kgs</option>
                                    </select>

                                  ) : (
                                    userObj.Qunits
                                  )}



                                </td>
                                <td>
                                  {editingRow === userObj.id ? (
                                    <input
                                      type="number"
                                      step="any"
                                      className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                      id="clients-edit"
                                      name="clients-edit"
                                      placeholder={userObj.amountToClients}
                                      min={0}
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          amountToClients: event.target.value,
                                        });
                                        calculateLandFillEdit();
                                      }} />) : (userObj.amountToClients)}</td>
                                <td>
                                  {editingRow === userObj.id ? (
                                    <input
                                      type="number"
                                      step="any"
                                      className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                      id="animalFeed-edit"
                                      name="animalFeed-edit"
                                      placeholder={userObj.amountToAFeed}
                                      min={0}
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          amountToAFeed: event.target.value,
                                        });
                                        calculateLandFillEdit();
                                      }} />
                                  ) : (userObj.amountToAFeed)}</td>
                                <td>
                                  {editingRow === userObj.id ? (
                                    <input
                                      type="number"
                                      step="any"
                                      className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                      id="compost-edit"
                                      name="compost-edit"
                                      placeholder={userObj.amountToCompost}
                                      min={0}
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          amountToCompost: event.target.value,
                                        });
                                        calculateLandFillEdit();
                                      }} />

                                  ) : (
                                    userObj.amountToCompost
                                  )}


                                </td>
                                <td>
                                  {editingRow === userObj.id ? (

                                    <input
                                      type="number"
                                      step="any"
                                      className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                      id="partnerNetwork-edit"
                                      name="partnerNetwork-edit"
                                      placeholder={userObj.amountToPartNet}
                                      min={0}
                                      onChange={(event) => {
                                        setEditTrackers({
                                          ...trackers_edit,
                                          amountToPartnerNetwork: event.target.value,
                                        });
                                        calculateLandFillEdit();
                                      }} />

                                  ) : (
                                    userObj.amountToPartNet
                                  )}

                                </td>
                                <td>
                                  {editingRow === userObj.id ? (

                                    <input
                                      type="number"
                                      step="any"
                                      id="landfill_edit"
                                      className={`form-control ${trackerCSS["customised-smaller-input"]}`}
                                      placeholder={calculateLandFillEdit()}
                                      value={calculateLandFillEdit()}
                                      min={0}
                                      readonly="readonly" />

                                  ) : (
                                    userObj.amountToLandfill
                                  )}



                                </td>
                                <td>
                                  {dateFormat(userObj.date_time, "mmmm dS, yyyy")}
                                </td>
                                <td>
                                  <div>

                                    {editingRow === userObj.id ? (
                                      <>
                                        <button variant="success" className="btn btn-success" style={{ width: "fit-content" }} onClick={() => {

                                          axios
                                            .put(
                                              `http://localhost:8000/api/trackerUpdate/${userObj.id}`,
                                              {
                                                Category: trackers_edit.Category,
                                                Description: trackers_edit.Description,
                                                Quantity: trackers_edit.Quantity,
                                                Qunits: trackers_edit.Qunits,
                                                amountToClients: trackers_edit.amountToClients,
                                                amountToAFeed: trackers_edit.amountToAFeed,
                                                amountToCompost: trackers_edit.amountToClients,
                                                amountToPartNet: trackers_edit.amountToPartnerNetwork,
                                                amountToLandfill: parseFloat(document.getElementById('landfill_edit').value),
                                                percentClients: parseFloat((trackers_edit.amountToClients / trackers_edit.Quantity) * 100),
                                                percentAFeed: parseFloat((trackers_edit.amountToAFeed / trackers_edit.Quantity) * 100),
                                                percentCompost: parseFloat((trackers_edit.amountToCompost / trackers_edit.Quantity) * 100),
                                                percentPartNet: parseFloat((trackers_edit.amountToPartnerNetwork / trackers_edit.Quantity) * 100),
                                                percentLandfill: parseFloat((document.getElementById('landfill_edit').value / trackers_edit.Quantity) * 100),
                                                Email: userObj.Email,
                                                Organization: userObj.Organization
                                              },
                                              {
                                                headers: {
                                                  "Content-type": "application/json",
                                                },
                                              }
                                            )
                                            .then((response) => {
                                              if (response.status == 201) {
                                                setIsSubmitted(true);
                                                fetchData();
                                                fetchPercentageChartData();
                                                fetchCategoryChartData();
                                                defaultValue();
                                              }
                                            })
                                            .catch((err) => console.warn(err));

                                        }}><FontAwesomeIcon icon={faSquareCheck} /></button>
                                        <br />
                                        <button variant="danger" className="btn btn-danger" style={{ width: "fit-content" }} onClick={() => {
                                          defaultValue();
                                          fetchData();
                                          fetchPercentageChartData();
                                          fetchCategoryChartData();
                                          defaultValue();


                                        }}><FontAwesomeIcon icon={faRectangleXmark} /></button>
                                      </>
                                    ) : (
                                      <><Button variant="primary" className="btn" onClick={() => handleEdit(userObj.id)} style={{ width: "fit-content" }}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        <Button
                                          variant="danger"
                                          className="btn btn-danger"
                                          style={{ width: "fit-content" }}
                                          name="field"
                                          onClick={(e) => {
                                            axios
                                              .put(
                                                `http://localhost:8000/api/trackerDelete/${userObj.id}`,
                                                {},
                                                {
                                                  headers: {
                                                    "Content-type": "application/json",
                                                  },
                                                }
                                              )
                                              .then((response) => {
                                                if (response.status == 200) {
                                                  setIsSubmitted(true);
                                                  fetchData();
                                                  fetchPercentageChartData();
                                                  fetchCategoryChartData();
                                                }
                                              })
                                              .catch((err) => console.warn(err));
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </Button></>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ) : <>
                            </>

                          ))}

                      </tbody>
                    </Table>
                  </div>
                </div>
              </section><br /></>
            ) : null}
            {
              isSubmitted && (
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  recycle={false}
                  run={isRunning}
                  numberOfPieces={isRunning ? undefined : 0}
                  onConfettiComplete={onConfettiComplete}
                />
              )
            }
          </div >
        </div >
      );
    }
  } else if (
    new Date().getTime() > localStorage.getItem("expiry")
  ) {
    return (
      <section>
        <div className="flex-container">
          <div className="text-center">
            <h1 className="heading1">
              <span className="fade-in" id="digit1">
                4
              </span>
              <span className="fade-in" id="digit2">
                0
              </span>
              <span className="fade-in" id="digit3">
                4
              </span>
            </h1>
            <h3 className=" heading3 fadeIn">
              YOU MUST LOGIN TO VIEW THIS PAGE
            </h3>
            <a href="/login">
              <Button type="button" class="btn btn-primary " name="button">
                Login
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

}
export default Tracker;
