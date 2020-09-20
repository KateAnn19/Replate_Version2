import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Button from 'react-bootstrap/Button';

//styles


import { connect } from "react-redux";
import { login } from "./store/actions/index";
import classes from "*.module.css";

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

const Login = () => {
  const { push } = useHistory();
  const [loginInfo, setLoginInfo] = useState(initialState);
  console.log("login");

  const classes = useStyles();

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
 

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("auth/login", loginInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        //if volunteer push to volunteer profile
        //if business push to business profile
        // eslint-disable-next-line no-lone-blocks

        // eslint-disable-next-line no-lone-blocks
        {
          loginInfo.role === "business"
            ? push("/business-profile")
            : push("/volunteer-profile");
        } //we will want to push to volunteer page if volunteer and donor page if donor
      })
      .catch((err) => console.log(loginInfo.error));
  };

  return (
    <div className="Login-Form">
      <h1 className="replate-header">Replate</h1>
      <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
        <form className="login" onSubmit={login}>
          <TextField
            type="text"
            name="username"
            value={loginInfo.username}
            onChange={handleChange}
            placeholder="username"
            fullWidth
          />
          <input
            type="password"
            name="password"
            value={loginInfo.password}
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
      </Paper>
      <h2>Login</h2>
      <h2>New to Replate?</h2>
      <h2>Register Below</h2>
      <div className={classes.root}>
        <Button
          variant="info"
          onClick={() => push("/business-registration")}
        >
          Register as a Business
        </Button>{''}
        <Button onClick={() => push("/volunteer-registration")}>
          Sign Up as a Volunteer
        </Button>
        <Button variant="info">Hello</Button>{''}
      </div>
    </div>
  );
};

export default Login;

//.post("/pickups", newPickup)

//api/pickups/unassigned (list unassigned)

//get pickups (list of pickups) - volunteer information if associated w/pickup if it has it (volunteer can see on profile)

//post pickups (working)
// businesses (working)

//business (get) (if logged in as a business)
//business can create a pickup (post) (if logged in as business)
