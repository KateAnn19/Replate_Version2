import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

//styles
import "./styles/login.css";

import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Button from "react-bootstrap/Button";

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
  console.log(success);
  console.log(loginInform);
  console.log("role", role);
 

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
      <h1 className="replate-header">Replate</h1>
      <form
        className="login"
        onSubmit={handleSubmit}
        //we will want to push to volunteer page if volunteer and donor page if donor
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
        <button type="submit">Submit Form</button>
      </form>
      <h2>Login</h2>
      <h2>New to Replate?</h2>
      <h2>Register Below</h2>
      <Button variant="light" onClick={() => push("/business-registration")}>
        {``}
        Register as a Business
      </Button>
      <Button variant="light" onClick={() => push("/volunteer-registration")}>
        Sign Up as a Volunteer
      </Button>
      {error !== "" ? <h1>Try Logging In Again</h1> : null}
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
