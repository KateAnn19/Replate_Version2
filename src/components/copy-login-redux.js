import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

//styles
import "./styles/login.css";

import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";
import { login } from "./store/actions/index";



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

const Login = ({ login, loginInfo }) => {
  const { push } = useHistory();
  const [loginInform, setLoginInfo] = useState(initialState);


  const classes = useStyles();

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInform,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div>
      <h1 className="replate-header">Replate</h1>
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault()
          login(loginInform);
          // localStorage.setItem("token", loginInfo);

          setTimeout(function () {
            loginInform.role === "business"
              ? push("/business-profile")
              : push("/volunteer-profile");
          }, 2000);

          //we will want to push to volunteer page if volunteer and donor page if donor
        }}
      >
        <TextField
          type="text"
          name="username"
          value={loginInform.username}
          onChange={handleChange}
          placeholder="username"
        />
        <TextField
          type="password"
          name="password"
          value={loginInform.password}
          onChange={handleChange}
          placeholder="password"
        />
        <label htmlFor="role">
          Please Select
          <select id="role" name="role" onChange={handleChange}>
            <option value=""></option>
            <option value="volunteer">Volunteer</option>
            <option value="business"> Business</option>
          </select>
        </label>
        <button>Submit Form</button>
      </form>
      <h2>Login</h2>
      <h2>New to Replate?</h2>
      <h2>Register Below</h2>
      <Button variant="light" onClick={() => push("/business-registration")}>{``}
        Register as a Business
      </Button>
      <Button variant="light" onClick={() => push("/volunteer-registration")}>
        Sign Up as a Volunteer
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    error: state.error,
    loginInfo: state.loginInfo,
  };
};

export default connect(mapStateToProps, { login })(Login);

//.post("/pickups", newPickup)

//api/pickups/unassigned (list unassigned)

//get pickups (list of pickups) - volunteer information if associated w/pickup if it has it (volunteer can see on profile)

//post pickups (working)
// businesses (working)

//business (get) (if logged in as a business)
//business can create a pickup (post) (if logged in as business)
