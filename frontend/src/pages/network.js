//Sharing page
import React, { useState, useEffect, useRef } from "react";
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./network.css";
import fourcss from "./fourcss.css";
import axios, { all } from "axios";
import { local } from "d3-selection";
import * as d3 from "d3";
import saveSvgAsPng from 'save-svg-as-png';

var filter = "Product";
var time_filter = "http://localhost:8000/api/networkPull/";


const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    const radius = Math.min(width, height) / 2 - 20; // Adjusted for the thickness of the donut
    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.6) // Inner radius adjusted for the thickness of the donut
      .outerRadius(radius)
      .padAngle(0.02);


    const outerArc = d3.arc()
      .outerRadius(radius * 0.8) // Increased to move labels farther from the graph
      .innerRadius(radius * 0.9);

    const nonNullEntries = Object.entries(data).filter(([key, value]) => value != null);
    const arcs = pie(nonNullEntries.map(([key, value]) => ({ key, value })));


    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const paths = g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.key));
    const labels = g.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => {
        const posA = outerArc.centroid(d);
        const posB = arc.centroid(d);
        const posC = [(posB[0] + posA[0]) / 2, (posB[1] + posA[1]) / 2];
        const scaleFactor = -6.5;
        const posD = [(posB[0] - posA[0]) * scaleFactor + posB[0], (posB[1] - posA[1]) * scaleFactor + posB[1]];
        return `translate(${posD})`;
      })
      .attr('dy', '0.35em')
      .text(d => `${d.data.key} - ${d.data.value}`)
      .style('font-size', '16px')
      .style('text-anchor', d => getLabelAnchor(d))
      .style('fill', '#333')
      .style('font-weight', 'normal')
      .style('text-shadow', '1px 1px #fff');

    const labelLines = g.selectAll('polyline')
      .data(arcs)
      .enter()
      .append('polyline')
      .attr('points', d => {
        const posA = outerArc.centroid(d);
        const posB = arc.centroid(d);
        const posC = [(posB[0] + posA[0]) / 2, (posB[1] + posA[1]) / 2];
        const scaleFactor = -6.5;
        const posD = [(posB[0] - posA[0]) * scaleFactor + posB[0], (posB[1] - posA[1]) * scaleFactor + posB[1]];
        return [posA, posC, posD];
      })
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('stroke-width', '1px')
      .style('stroke-opacity', 0.5);


    const labelPaths = g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', d => {
        const posA = outerArc.centroid(d);
        const posB = arc.centroid(d);
        const posC = [(posB[0] + posA[0]) / 2, (posB[1] + posA[1]) / 2];
        return `M ${posA[0]} ${posA[1]} L ${posC[0]} ${posC[1]} L ${posB[0]} ${posB[1]}`;
      })
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('stroke-width', '1px')
      .style('stroke-opacity', 0.5);



    function getLabelAnchor(d) {
      // Position labels based on their location in the pie chart
      if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
        return 'start';
      } else {
        return 'end';
      }
    }

  }, [data]);

  function exportChart() {
    // Get the SVG element
    const svg = svgRef.current;

    // Set the filename and options for saving
    const filename = 'piechart.png';
    const options = {
      backgroundColor: 'white', // Set a white background color
    };

    // Call the saveSvgAsPng library to export the SVG as PNG
    saveSvgAsPng.saveSvgAsPng(svg, filename, options);
  }




  return (

    <svg ref={svgRef} onClick={exportChart} style={{ width: '80%', height: '80%' }}></svg>


  );
};
// searchBar function
function SearchBar() {
  const data = {}
  const [getData, setData] = useState([]);
  const [getLegend, setLegend] = useState([]);
  const [getSharedData, setSharedData] = useState([]);
  const [getGraphData, setGraphData] = useState([]);





  const [orgs, setorgs] = useState([]);
  const [email, setemail] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/distinctorg/')
      .then(response => response.json())
      .then(data => setorgs(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/distinctemail/')
      .then(response => response.json())
      .then(data => setemail(data))
      .catch(error => console.log(error));
  }, []);



  const fetchSharedData = async () => {
    axios
      .post(
        "http://localhost:8000/api/postsPullShared/",
        {
          Email: localStorage.getItem("email"),
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setSharedData(response.data);
        }
      })
      .catch((err) => console.warn(err));
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/networkPull/");
    const data = await response.json();
    return setData(data);
  };

  const fetchDataSharing = async () => {
    const response = await fetch(
      "http://localhost:8000/api/networkPullSharing/"
    );
    const data = await response.json();
    return setData(data);
  };

  const fetchDataReceiving = async () => {
    const response = await fetch(
      "http://localhost:8000/api/networkPullReceiving/"
    );
    const data = await response.json();
    return setData(data);
  };

  const fetchDataCreator = async () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/networkPullCreator/",
        {
          Email: localStorage.getItem("email"),
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setData(response.data);
        }
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchData();
    fetchSharedData();
  }, []);

  const [posts, setPosts] = useState({
    product: "",
    Type: "",
    Units: "",
    Quantity: "",
    Description: "",
    Email: "",
    public: ""
  });

  const [showModal, setShowModal] = useState(false);
  posts.Quantity = parseInt(posts.Quantity);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
    if (
      new Date().getTime() < localStorage.getItem("expiry")
    ) {
      return (
        <>
          <div className="share_box container-md col-md-auto">
            <div className="row">
              <div className="col">
                <p id="category_error" style={{ color: "red", display: "none" }}>Please select a Category</p>
                <p id="email_error" style={{ color: "red", display: "none" }}>Please select an Email</p>
                <h3>Combine by Organizations:</h3>
                <br />
                <div className="form-check ">
                  <div className="col-md-auto">
                    <div className="select-container">
                      <p id="category_error" style={{ color: "red", display: "none" }}>Please select a category</p>
                      <select name="category" id="category_org" className="form-select">
                        <option value={"choose"} selected>Select Category</option>
                        <option value={"Fresh Produce"}>Fresh Produce</option>
                        <option value={"Meat"}>Meat</option>
                        <option value={"Canned Food"}>Canned Food</option>
                        <option value={"Bread"}>Bread</option>
                        <option value={"Dairy"}>Dairy</option>
                        <option value={"Reclaimed"}>Reclaimed</option>
                      </select>
                      <select name="Organization" id="Organization" className="form-select" onChange={(event) => {

                        const selectedCategory = document.getElementById("category_org").value;

                        if (selectedCategory === 'choose') {
                          document.getElementById('category_error').style.display = "block";
                          return;
                        } else {
                          document.getElementById('category_error').style.display = "none";
                        }
                        axios
                          .post(
                            "http://localhost:8000/api/NetworkOrgGraphing/",
                            {
                              user_org: localStorage.getItem("organization"),
                              compare_org: event.target.value,
                              category: document.getElementById('category_org').value
                            },
                            {
                              headers: {
                                "Content-type": "application/json",
                              },
                            }
                          )
                          .then((response) => {
                            if (response.status == 201) {
                              const data = {
                                [localStorage.getItem('organization')]: response.data["user"]["data"],
                                [event.target.value]: response.data["comparee"]["data"]
                              }
                              if (!response.data['user']['data'] && !response.data['comparee']['data']) {
                                console.log('No data');
                                document.getElementById('graph_box').innerHTML = "No Data Found"
                              }


                              setGraphData(data);
                              setLegend(document.getElementById('category_org').value)

                            }
                          })
                          .catch((err) => console.warn(err));

                      }
                      }>
                        <option>Select Organization</option>
                        {orgs.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <h3>Combine by Users:</h3>
                <br />
                <div className="form-check ">
                  <div className="col-md-auto">
                    <div className="select-container">
                      <select name="category" id="category_email" className="form-select">
                        <option value={"choose"} selected>Select Category</option>
                        <option value={"Fresh Produce"}>Fresh Produce</option>
                        <option value={"Meat"}>Meat</option>
                        <option value={"Canned Food"}>Canned Food</option>
                        <option value={"Bread"}>Bread</option>
                        <option value={"Dairy"}>Dairy</option>
                        <option value={"Reclaimed"}>Reclaimed</option>
                      </select>
                      <select name="email" id="email" className="form-select" onChange={(event) => {
                        const selectedEmail = document.getElementById("category_email").value;

                        if (selectedEmail === 'choose') {
                          document.getElementById('email_error').style.display = "block";
                          return;
                        } else {
                          document.getElementById('email_error').style.display = "none";
                        }
                        axios.post(
                          "http://localhost:8000/api/NetworkGraphing/",
                          {
                            user_email: localStorage.getItem("email"),
                            compare_email: event.target.value,
                            category: document.getElementById('category_email').value
                          },
                          {
                            headers: {
                              "Content-type": "application/json",
                            },
                          }
                        )
                          .then((response) => {
                            if (response.status == 201) {
                              const data = {
                                [localStorage.getItem('email')]: response.data["user"]["data"],
                                [event.target.value]: response.data["comparee"]["data"]
                              }
                              if (!response.data['user']['data'] && !response.data['comparee']['data']) {
                                console.log('No data');
                                document.getElementById('graph_box').innerHTML = "No Data Found"
                              }
                              setGraphData(data);
                              setLegend(document.getElementById('category_email').value)

                            }
                          })
                          .catch((err) => console.warn(err));
                      }}>
                        <option>Select Email</option>
                        {email.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <h3>Shared with:</h3>
                <br />
                <div className="row">
                  <div className="col-6">
                    <h6>
                      <strong>Email</strong>
                    </h6>
                  </div>
                  <div className="col-6">
                    <h6>
                      <strong>Category</strong>
                    </h6>
                  </div>
                </div>
                {getSharedData &&
                  getSharedData.length > 0 &&
                  getSharedData.map((sharedObj) => (
                    <div className="row share_list">
                      <div className="col-6 email">{sharedObj.shared_with}</div>
                      <div className="col-4">
                        <div className="select-container">
                          <select name="category" id="category_btn" className="form-select">
                            <option value={"choose"} selected>Select Category</option>
                            <option value={"Fresh Produce"}>Fresh Produce</option>
                            <option value={"Meat"}>Meat</option>
                            <option value={"Canned Food"}>Canned Food</option>
                            <option value={"Bread"}>Bread</option>
                            <option value={"Dairy"}>Dairy</option>
                            <option value={"Reclaimed"}>Reclaimed</option>
                          </select>
                          <button
                            type="button"
                            className="graph_btn btn btn-outline-primary"
                            onClick={(event) => {

                              const selectedCategory = document.getElementById("category_btn").value;

                              if (selectedCategory === 'choose') {
                                document.getElementById('category_error').style.display = "block";
                                return;
                              } else {
                                document.getElementById('category_error').style.display = "none";
                              }

                              axios
                                .post(
                                  "http://localhost:8000/api/NetworkGraphing/",
                                  {
                                    user_email: localStorage.getItem("email"),
                                    compare_email: sharedObj.shared_with,
                                    category: document.getElementById('category_btn').value
                                  },
                                  {
                                    headers: {
                                      "Content-type": "application/json",
                                    },
                                  }
                                )
                                .then((response) => {
                                  if (response.status == 201) {
                                    const data = {
                                      [localStorage.getItem('email')]: response.data["user"]["data"],
                                      [sharedObj.shared_with]: response.data["comparee"]["data"]
                                    }
                                    if (!response.data['user']['data'] && !response.data['comparee']['data']) {
                                      console.log('No data');
                                      document.getElementById('graph_box').innerHTML = "No Data Found"
                                    }

                                    setGraphData(data);
                                    setLegend(document.getElementById('category_btn').value)

                                  }
                                })
                                .catch((err) => console.warn(err));

                            }}
                          >
                            <FontAwesomeIcon icon={faChartPie} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col graph_box chart chart-container" id="graph_box">
                <h2 className="legend">{getLegend}</h2>
                <PieChart data={getGraphData} id='piechart' />

              </div>
            </div>
          </div >
          <div className="container-lg col-md-auto">
            <div className="container-fluid">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => {
                    axios
                      .post(
                        "http://127.0.0.1:8000/api/networkSearch/",
                        {
                          filter: filter,
                          input: event.target.value,
                        },
                        {
                          headers: {
                            "Content-type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.status == 200) {
                          setData(response.data);
                        }
                      })
                      .catch((err) => console.warn(err));

                  }}
                />
              </div>

              <div className="select">
                <select
                  name="format"
                  className="form-select"
                  onChange={(event) => {
                    filter = event.target.value;
                  }}
                >
                  <option value="Email">Filter by: Email</option>
                  <option value="Product" selected>
                    Filter by: Product
                  </option>
                </select>
              </div>

              <div className="select">
                <select
                  name="format"
                  className="form-select"
                  onChange={async (event) => {
                    if (event.target.value == "default") {
                      time_filter = "http://localhost:8000/api/networkPull/";
                    }
                    if (event.target.value == "Past Hour") {
                      time_filter = "http://localhost:8000/api/Past_Hour/";
                    } else if (event.target.value == "Past day") {
                      time_filter = "http://localhost:8000/api/Past_Day/";
                    } else if (event.target.value == "Past week") {
                      time_filter = "http://localhost:8000/api/Past_Week/";
                    } else if (event.target.value == "Past month") {
                      time_filter = "http://localhost:8000/api/Past_Month/";
                    } else if (event.target.value == "Past 6 months") {
                      time_filter = "http://localhost:8000/api/Past_6Months/";
                    }

                    const response = await fetch(time_filter);
                    const data = await response.json();
                    setData(data);
                    console.log(getData);
                  }}
                >
                  <option value="default" selected>
                    Filter By Time
                  </option>
                  <option value="Past Hour">Past Hour</option>
                  <option value="Past day">Past day</option>
                  <option value="Past week">Past week</option>
                  <option value="Past month">Past month</option>
                  <option value="Past 6 months">Past 6 months</option>
                </select>
              </div>

              <div>
                <Button
                  type="Button"
                  className="create_btn btn btn-success"
                  onClick={handleShow}
                >
                  Create Post
                </Button>
              </div>
            </div>

            <div className="container-md p-0">
              <div className="tab container-sm">
                <Button
                  className="tablinks btn btn-light"
                  onClick={(e) => {
                    {
                      fetchData();
                    }
                  }}
                  id="defaultOpen"
                >
                  💬 All Posts
                </Button>
                <br />
                <Button
                  className="tablinks btn btn-light"
                  onClick={(e) => {
                    {
                      fetchDataSharing();
                    }
                  }}
                >
                  📣 Sharing
                </Button>
                <br />
                <Button
                  className="tablinks btn btn-light"
                  onClick={(e) => {
                    {
                      fetchDataReceiving();
                    }
                  }}
                >
                  💬 Receiving
                </Button>
                <br />
                <Button
                  className="tablinks btn btn-light"
                  onClick={(e) => {
                    {
                      fetchDataCreator();
                    }
                  }}
                >
                  💬 My Posts
                </Button>
                <br />
              </div>

              <div id="disc">

                {getData &&
                  getData.length > 0 ? (
                  getData
                    .map((userObj) => (
                      <div class="card">
                        <h5 class="card-header m-0">
                          <span>
                            {userObj.product} - {userObj.Quantity}{" "}
                            {userObj.Units}
                          </span>

                          {(() => {
                            if (
                              userObj.Email == localStorage.getItem("email") &&
                              userObj.Type == "Sharing"
                            ) {
                              return (
                                <select
                                  id="status"
                                  onChange={(event) => {
                                    if (event.target.value == "closed") {
                                      var a = prompt(
                                        "Enter the email address of the person you shared your products with:"
                                      );
                                      if (a === "") {
                                        alert(
                                          "The email field cannot be empty, please try again."
                                        );
                                        document.getElementById(
                                          "status"
                                        ).value = "open";
                                      } else {
                                        axios
                                          .put(
                                            `http://127.0.0.1:8000/api/networkUpdate/${userObj.id}`,

                                            {
                                              shared_with: a,
                                              product: userObj.product,
                                              Quantity: userObj.Quantity,
                                              Units: userObj.Units,
                                            },
                                            {
                                              headers: {
                                                "Content-type":
                                                  "application/json",
                                              },
                                            }
                                          )
                                          .then((response) => {
                                            if (response.status == 201) {
                                              window.alert(
                                                "The post status has successfully been changed to CLOSED."
                                              );
                                            }

                                            fetchSharedData();
                                            fetchData();
                                            fetchDataCreator();
                                            fetchDataReceiving();
                                            fetchDataSharing();
                                          })
                                          .catch((err) => console.warn(err));
                                      }
                                    }
                                  }}
                                >
                                  {(() => {
                                    if (userObj.state == "open") {
                                      // document.getElementById('status').style.borderColor = 'green';
                                      return (
                                        <>
                                          <option selected> open </option>
                                          <option> closed </option>
                                        </>
                                      );
                                    } else {
                                      // document.getElementById('status').style.borderColor = 'red';
                                      return (
                                        <>
                                          <option> open </option>
                                          <option selected> closed </option>
                                        </>
                                      );
                                    }
                                  })()}
                                </select>
                              );
                            } else {
                            }
                          })()}
                        </h5>
                        <div class="card-body">
                          <h6 class="card-text">{userObj.Description}</h6>
                          {/* <a href='"+ url_mask + "' id='postbutton' class='btn btn-outline-success'>Comment</a>*/}
                          <p class="text-success"> {userObj.Type} </p>

                          <div className="contact_me">
                            <small>
                              <strong>Contact email: </strong>
                              {userObj.Email} <br />
                              Posted on:{" "}
                              {new Date(userObj.date_time).toLocaleString(
                                "default",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}{" "}
                              at{" "}
                              {new Date(userObj.date_time).toLocaleTimeString(
                                "default",
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))
                    .reverse()) : (
                  <div id="nposts">
                    <h3 id="no_posts">No posts found</h3>
                  </div>
                )

                }
              </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product"
                      placeholder="Enter product name"
                      onChange={(event) => {
                        setPosts({ ...posts, product: event.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      id="quantity"
                      placeholder="Enter quantity"
                      onChange={(event) => {
                        setPosts({ ...posts, Quantity: event.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="units">Units</label>
                    <select
                      className="form-control"
                      id="units"
                      onChange={(event) => {
                        setPosts({ ...posts, Units: event.target.value });
                      }}
                    >
                      <option>Choose an option</option>
                      <option>lbs</option>
                      <option>kgs</option>
                    </select>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea
                      className="form-control"
                      id="desc"
                      rows="3"
                      onChange={(event) => {
                        setPosts({ ...posts, Description: event.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                      className="form-control"
                      id="type"
                      onChange={(event) => {
                        setPosts({ ...posts, Type: event.target.value });
                      }}
                    >
                      <option>Choose an option</option>
                      <option>Sharing</option>
                      <option>Receiving</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="public">Share to Public: </label>
                    <select
                      className="form-control"
                      id="units"
                      onChange={(event) => {
                        setPosts({ ...posts, public: event.target.value });
                      }}
                    >
                      <option>Choose an option</option>
                      <option>yes</option>
                      <option>no</option>
                    </select>
                  </div>
                  <br />

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      axios
                        .post(
                          "http://127.0.0.1:8000/api/networkInsert/",
                          {
                            product: posts.product,
                            Type: posts.Type,
                            Quantity: posts.Quantity,
                            Units: posts.Units,
                            Description: posts.Description,
                            Email: localStorage.getItem("email"),
                            public: posts.public
                          },
                          {
                            headers: {
                              "Content-type": "application/json",
                            },
                          }
                        )
                        .then((response) => {
                          if (response.status == 201) {
                            handleClose(e); //Close modal
                            //window.alert("Your form has been submitted succesfully")
                            fetchData();
                          }
                        })
                        .catch((err) => console.warn(err));
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div >
        </>
      );
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
              <h3 className="heading3 fadeIn">
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
}

export default SearchBar;
