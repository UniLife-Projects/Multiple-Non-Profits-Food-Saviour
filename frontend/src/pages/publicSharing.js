import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import './network.css';
import axios, { all } from 'axios';
var filter = 'Product';
var time_filter = 'http://localhost:8000/api/networkPull/';
function PublicSharing() {
  const [getData, setData] = useState([]);


  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/networkPull/");
    const data = await response.json();
    return setData(data);
  }

  const fetchDataSharing = async () => {
    const response = await fetch("http://localhost:8000/api/networkPullSharing/");
    const data = await response.json();
    return setData(data);
  }

  const fetchDataReceiving = async () => {
    const response = await fetch("http://localhost:8000/api/networkPullReceiving/");
    const data = await response.json();
    return setData(data);
  }


  useEffect(() => {
    fetchData();
  }, [])

  const [posts, setPosts] = useState({
    product: '',
    Type: '',
    Units: '',
    Quantity: '',
    Description: '',
    Email: ''
  });

  const [showModal, setShowModal] = useState(false);
  posts.Quantity = parseInt(posts.Quantity)
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  localStorage.clear();
  return (
    <>

      <div className="container-lg col-md-auto">
        <div className="container-fluid">
          <div className="input-group">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
              onChange={(event) => {
                axios.post(
                  "http://127.0.0.1:8000/api/networkSearch/",
                  {
                    filter: filter,
                    input: event.target.value
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                    }
                  }
                )
                  .then(response => {
                    if (response.status == 200) {
                      setData(response.data);
                      console.log(response.data)
                    }
                  })
                  .catch(err => console.warn(err));
              }}
            />
          </div>

          <div className="select">
            <select name="format" className="form-select"
              onChange={(event) => {
                filter = event.target.value;
              }}
            >
              <option value="Email" >Filter by: Email</option>
              <option value="Product" selected>Filter by: Product</option>
            </select>
          </div>

          <div className="select">
            <select name="format" className="form-select"

              onChange={async (event) => {
                if (event.target.value == 'default') {
                  time_filter = 'http://localhost:8000/api/networkPull/'
                }
                if (event.target.value == 'Past Hour') {
                  time_filter = 'http://localhost:8000/api/Past_Hour/'
                } else if (event.target.value == 'Past day') {
                  time_filter = 'http://localhost:8000/api/Past_Day/'
                }
                else if (event.target.value == 'Past week') {
                  time_filter = 'http://localhost:8000/api/Past_Week/'
                } else if (event.target.value == 'Past month') {
                  time_filter = 'http://localhost:8000/api/Past_Month/'
                } else if (event.target.value == 'Past 6 months') {
                  time_filter = 'http://localhost:8000/api/Past_6Months/'
                }

                const response = await fetch(time_filter);
                const data = await response.json();
                setData(data);
                console.log(getData)

              }}>
              <option value="default" selected>Filter By Time</option>
              <option value="Past Hour">Past Hour</option>
              <option value="Past day">Past day</option>
              <option value="Past week">Past week</option>
              <option value="Past month">Past month</option>
              <option value="Past 6 months">Past 6 months</option>
            </select>



          </div>

          <div>
            <Button type="Button" className="create_btn btn btn-success" onClick={handleShow}>Create Post</Button>
          </div>
        </div>

        <div className="container-md">
          <div className="tab container-sm">
            <Button className="tablinks btn btn-light" onClick={(e) => { { fetchData() } }} id="defaultOpen">
              💬 All Posts</Button><br />
            <Button className="tablinks btn btn-light" onClick={(e) => { { fetchDataSharing() } }}  >📣 Sharing</Button><br />
            <Button className="tablinks btn btn-light" onClick={(e) => { { fetchDataReceiving() } }}>💬 Receiving</Button><br />
          </div>

          <div id="disc">
            {getData &&
              getData.length > 0 &&
              getData
                .map((userObj) => (
                  userObj.public === 'yes' ? (
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


                                          fetchData();

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
                  ) : null
                ))
                .reverse()}
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
                <input type="text" className="form-control" id="product" placeholder="Enter product name"
                  onChange={(event) => {
                    setPosts({ ...posts, product: event.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Enter your Email"
                  onChange={(event) => {
                    setPosts({ ...posts, Email: event.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" step="any" className="form-control" id="quantity" placeholder="Enter quantity"
                  onChange={(event) => {
                    setPosts({ ...posts, Quantity: event.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="units">Units</label>
                <select className="form-control" id="units"
                  onChange={(event) => {
                    setPosts({ ...posts, Units: event.target.value })
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
                <textarea className="form-control" id="desc" rows="3"
                  onChange={(event) => {
                    setPosts({ ...posts, Description: event.target.value })
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select className="form-control" id="type"
                  onChange={(event) => {
                    setPosts({ ...posts, Type: event.target.value })
                  }}
                >
                  <option>Choose an option</option>
                  <option>Sharing</option>
                  <option>Receiving</option>
                </select>
              </div>

              <Button variant="primary" type="submit"
                onClick={(e) => {
                  axios.post(
                    "http://127.0.0.1:8000/api/networkInsert/",
                    {
                      product: posts.product,
                      Type: posts.Type,
                      Quantity: posts.Quantity,
                      Units: posts.Units,
                      Description: posts.Description,
                      Email: posts.Email,
                      public: "yes"
                    },
                    {
                      headers: {
                        "Content-type": "application/json",
                      }
                    }
                  )
                    .then(response => {
                      if (response.status == 201) {
                        handleClose(e); //Close modal
                        //window.alert("Your form has been submitted succesfully")
                        fetchData();
                      }
                    })
                    .catch(err => console.warn(err));
                }}
              >
                Submit
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default PublicSharing;