import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let initialState = {
  username: "",
  password: "",
  role: "donor",
  name: "",
  address: "",
  phone: "",
};

let successfulregister =
  "Thank you! That was a sucess! You'll be re-directed to login page. Please login with username and password.";

const BusinessRegistration = () => {
  const [values, setValues] = useState(initialState);
  const [message, setMessage] = useState(successfulregister);
  const [success, setSuccess] = useState(false);
  console.log(values);
  const { push } = useHistory();

  const changeHandler = (ev) => {
    ev.persist();
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://replater.herokuapp.com/api/auth/register", values)
      .then((res) => {
        setSuccess(!success);
        setTimeout(function () {
          push("/");
        }, 2000);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return success ? (
    <div>
      <h3 className="regis_success_message">{message}</h3>{" "}
    </div>
  ) : (
    <div className="form_container">
      <h3 className="bus_regis_header"><em>Business Registration</em></h3>
      <Form id="login_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="name"
            onChange={changeHandler}
            name="name"
            placeholder="Enter Business Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            onChange={changeHandler}
            name="username"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhonenumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="phone"
            onChange={changeHandler}
            name="phone"
            placeholder="Phone Number"
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            onChange={changeHandler}
            name="address"
            placeholder="address"
          />
        </Form.Group>
        <Button id="login_submit" type="submit">
          Submit
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
};

export default BusinessRegistration;
