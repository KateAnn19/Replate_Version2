import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

//imports
//import "./Logout.css";

import { connect} from "react-redux";
import { logout } from "./store/actions/index";

function Logout({logout}) {
  const history = useHistory();

  // window.localStorage.removeItem('token');
  // window.localStorage.removeItem('loggedInUser');
  //setLoggedInUser('');
  //setTimeout, then redirect to login
  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header
    logout();
    
    setTimeout(() =>{
      history.push('/');
    }, 1000)
    
  }, []);


  return (
    <div className="logout">
      <h1>Thanks for using Replate</h1>
    </div>
  )
}//end logOut

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    error: state.error,
    loginInfo: state.loginInfo,
    success: state.success,
    role: state.role,
  };
};

export default connect(mapStateToProps, { logout })(Logout);
