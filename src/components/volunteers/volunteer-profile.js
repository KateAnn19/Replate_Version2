//this will display a particular volunteers profile
//the volunteer will be able to edit their profile which includes their name and phone number
//if the volunteer updates their profile and they have pickups in progress it should also update on the business that owns that /////pickup
//the volunteer will be able to go to the list of pickups and add a pickup
//the volunteer's profile will display the pickups they have agreed to pickup
//the pickups data will include ...
//the volunteer cannot edit the pickup, but they can delete it from their profile

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//styles
import "../styles/pickups.css";

import EditProfileForm from "./editVolProfileForm";

//Redux
import { connect } from "react-redux";
import { getVolProfData, deleteVolProf } from "../store/actions/index";

const date = require("moment");

function VolunteerProfile({getVolProfData, volProf, deleteVolProf}) {
  const [profile, setProfile] = useState({});
  const [pickups, setPickups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { push } = useHistory();

  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header
    getData();
    getVolProfData();
    setIsLoaded(true)
  }, []);

  //add pickup

  const getData = () => {
    axiosWithAuth()
      .get("pickups")
      .then((res) => {
        setPickups(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  
  const removePickup = (id) => {
    //delete pickup from profile
    axiosWithAuth()
      .put(`pickups/assign/${id}`, {
        "volunteer-id": "",
      })
      .then((res) => {
        getData();
     push("/volunteer-profile");
      })
      .catch((err) => console.log(err.response));
  };

  
  return (
    <div>
      {isLoaded === false ? (
        "loading"
      ) : (
        <>
          <h3>{volProf["volunteer-name"]}</h3>
          <h3>{volProf["volunteer-phone"]}</h3>
          <h3>{volProf["username"]}</h3>
        </>
      )}
      {toggle ? <EditProfileForm profile={volProf} setToggle={setToggle} /> : null}
      <h2>Current Pickups</h2>
      <div className="Vols-Picks">
        {pickups.map((pickup) => (
          <div key={pickup["pickup-id"]} className="pickups">
            <div className="pickups-container">
              <h2>{pickup.type}</h2>
              <h2>{pickup["business-phone"]}</h2>
              <h2>{pickup["business-name"]}</h2>
              <h2>{pickup["business-address"]}</h2>
              <h2>{pickup["amount"]}</h2>
              <h2>{date(pickup["pickup-date"]).format("ll")}</h2>
            </div>
            <button onClick={() => removePickup(pickup["pickup-id"])}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => push("/pickup-list")}>Add Pickup</button>
      <button onClick={() => setToggle(!toggle)}>Edit Profile</button>
      <button onClick={() => 
        {
        deleteVolProf()
        push("/logout")
        }}>Delete Profile</button>
    </div>
  );
} //end volunteerProfile


const mapStateToProps = (state) => {
  console.log("this is state in volunteer-profile", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    volProf: state.volProf,
    deleteVolProf: state
  };
};

export default connect(mapStateToProps, { getVolProfData, deleteVolProf })(VolunteerProfile);



//----------------------------------------------------
// for testing purposes - can be ignored
//----------------------------------------------------

// eslint-disable-next-line no-lone-blocks
{
  /* {pickups.map((pickup) => (
          <div className="pickups">
            <div className="pickups-container">
              <h2>{pickup.type}</h2>
              <h2>{pickup.amount}</h2>
              <h2>{pickup.pickupTime}</h2>
            </div>
            <button onClick={deletePickup}>Delete</button>
          </div>
        ))} */
}
//----------------------------------------------------
// for testing purposes - can be ignored
//----------------------------------------------------
