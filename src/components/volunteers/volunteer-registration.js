import React, { useState} from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let initialState = {
  username: "",
  password: "",
  role: "volunteer",
  name: "",
  phone: "",
};

let successfulregister = "Thank you! That was a sucess! You'll be re-directed to login page. Please login with username and password."

const VolunteerRegistration = () => {
  const [values, setValues] = useState(initialState);
  const [message, setMessage] = useState(successfulregister);
  const [success, setSuccess] = useState(false);
  const { push } = useHistory();

  console.log(values);

  const changeHandler = (ev) => {
    ev.persist();
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://replater.herokuapp.com/api/auth/register", values)
      .then((res) => {
        console.log(res);
        setSuccess(!success);
        setTimeout(function () {
          push("/")
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 500) {
        } //end if
      });
  };
  return (
    success ? <div><h3>{message}</h3></div>:
    <div className="form_container">
      <h3 className="bus_regis_header"><em>Volunteer Registration</em></h3>
      <Form id="login_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            onChange={changeHandler}
            name="name"
            placeholder="Enter Name"
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
        <Button id="login_submit" type="submit">
          Submit
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
    // <div className="user-form">
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">
    //       Name
    //       <input
    //         id="name"
    //         onChange={changeHandler}
    //         type="text"
    //         name="name"
    //         placeholder="name"
    //       />
    //     </label>
    //     <label htmlFor="username">
    //       User Name
    //       <input
    //         id="username"
    //         onChange={changeHandler}
    //         type="text"
    //         name="username"
    //         placeholder="username"
    //       />
    //     </label>
    //     <label htmlFor="password">
    //       Password
    //       <input
    //         id="password"
    //         onChange={changeHandler}
    //         type="password"
    //         name="password"
    //         placeholder="password"
    //       />
    //     </label>
    //     <label htmlFor="phone">
    //       Phone
    //       <input
    //         id="phone"
    //         onChange={changeHandler}
    //         type="text"
    //         name="phone"
    //         placeholder="Phone"
    //       />
    //     </label>

    //     <button type="submit">Register</button>
    //   </form>
    //   <p>
    //     Already have an account? <Link to="/">Log in</Link>
    //   </p>
      
    // </div>
  );
};

export default VolunteerRegistration;
