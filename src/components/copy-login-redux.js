import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

//styles
import "./styles/login.css";

import { makeStyles } from "@material-ui/core/styles";


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { connect, useDispatch } from "react-redux";
import { login, logout } from "./store/actions/index";

let initialState = {
  username: "",
  password: "",
  role: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const LoginUser = ({ login, logout, loginInfo, role, success, error }) => {
  const { push } = useHistory();
  const [loginInform, setLoginInfo] = useState(initialState);

  console.log(loginInform.username);
  console.log(loginInform.password);
  console.log(loginInform.role);

  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header

    pushToProfile();
  }, [role]);

  //401, 400, ""
  console.log(error);
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginInform);
  };

  function pushToProfile() {
    if (role === "business") {
      console.log("inside set timeout");
      push("/business-profile");
    } else if (role === "volunteer") {
      push("/volunteer-profile");
    } else {
      setLoginInfo(initialState);
    }
  }

  return (
    <div>
      <div className="login_header_container">
        <div className="replate-header">
          <h1 className="replate-title">Replate</h1>
          <h2 className="replate-subheader">
            <em>Food Waste Prevention and Improving Lives</em>
          </h2>
        </div>
        <img
          className="login_image"
          alt="persons fist bumping"
          src="https://images.unsplash.com/photo-1584466990376-09422a2b033a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ></img>
      </div>
      <div className="form_container">
        <h3 className="login_heading">Login</h3>
        <Form id="login_form" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={loginInform.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={loginInform.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Please Select One</Form.Label>
            <Form.Control as="select" name="role" onChange={handleChange}>
              <option value="">Please Select</option>
              <option value="volunteer">Volunteer</option>
              <option value="business">Business</option>
            </Form.Control>
          </Form.Group>
          <Button id="login_submit" type="submit">
            Submit
          </Button>
        </Form>
        <div id="register_container">
          <h3>New to Replate?</h3>
          <h5>
            <em>Sign Up!</em>
          </h5>
          <div id="register_button_container">
            <Button
              id="business_regis_button"
              onClick={() => push("/business-registration")}
            >
              {``}
              Sign Up as a Business
            </Button>
            <Button
              id="volunteer_regis_button"
              onClick={() => push("/volunteer-registration")}
            >
              Sign Up as a Volunteer
            </Button>
            
          </div>
          <Form.Text className="text-muted">
              We won't spam your inbox.
            </Form.Text>
          {error !== "" ? (
            <h3 className="login_error">Try Logging In Again</h3>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    error: state.error,
    loginInfo: state.loginInfo,
    success: state.success,
    role: state.role,
  };
};

export default connect(mapStateToProps, { login, logout })(LoginUser);

//.post("/pickups", newPickup)

//api/pickups/unassigned (list unassigned)

//get pickups (list of pickups) - volunteer information if associated w/pickup if it has it (volunteer can see on profile)

//post pickups (working)
// businesses (working)

//business (get) (if logged in as a business)
//business can create a pickup (post) (if logged in as business)
