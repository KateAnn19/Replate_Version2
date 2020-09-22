import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

//styles
import "../styles/businessprofile.css";
import "../styles/pickups.css";

//bootstrap
import Button from "react-bootstrap/Button";

import EditPickup from "./editPickup";

import Business from "./business";
import EditProfileForm from "./editBusProfileForm";

//redux
import { connect } from "react-redux";
//actions from Redux
import {
  getBusProfData,
  deleteBusProf,
  getPickups,
} from "../store/actions/index";

const d = require("moment");

let fakeProfile = {
  name: "",
  username: "",
  phone: "",
  address: "",
  role: "donor",
};

function BusinessProfile({
  getBusProfData,
  busProf,
  deleteBusProf,
  getPickups,
  pickups,
}) {
  const [profile, setProfile] = useState(fakeProfile);
  const [picks, setPicks] = useState(pickups);
  const [isLoaded, setIsLoaded] = useState(false);
  const { push } = useHistory();
  const [toggle, setToggle] = useState(false);

  console.log(pickups);

  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header
    getBusProfData();
    //getData();
    getPickups();

    setIsLoaded(!isLoaded);
  }, []);

  // const getData = () => {
  //   console.log("calling update");
  //   axiosWithAuth()
  //     .get("pickups")
  //     .then((res) => {
  //       console.log(res);
  //       setPicks([...res.data]);
  //       setTimeout(function () {
  //         setIsLoaded(true);
  //       }, 1000);
  //     })
  //     .catch((err) => console.log(err));
  // };

  //add pickup

  return (
    <div>
      {isLoaded === false ? (
        <h2 className="loading">loading</h2>
      ) : (
        <div className="business_info_container">
          <h3>{busProf["business-name"]}</h3>
          <h3>Address: {busProf["business-address"]}</h3>
          <h3>Phone: {busProf["business-phone"]}</h3>
          <h3>{busProf.username}</h3>
        </div>
      )}
      {toggle
        ? push("/edit-business-profile")
        : //<EditProfileForm getProfileData={getBusProfData} profile={busProf} togglestate={toggle} setToggle={setToggle} />
          null}
      <h2 className="pickups_heading">Current Pickups</h2>
      {isLoaded === false ? (
        <h2 className="loading">loading</h2>
      ) : (
        <Business
          setIsLoaded={setIsLoaded}
          //update={getData}
          setAllPickups={setPicks}
          pickupdata={pickups}
          //getData={getData}
        />
      )}
      <div id="prof_button_group">
        <Button id="add" onClick={() => push("/add-pickup")}>
          Add Pickup
        </Button>
        {/* <button onClick={() => setToggle(!toggle)}>Edit Profile</button> */}
        <Button id="edit" onClick={() => push("/edit-business-profile")}>
          Edit Profile
        </Button>

        <Button
          id="delete"
          onClick={() => {
            deleteBusProf();
            push("/logout");
          }}
        >
          Delete Profile
        </Button>
      </div>
    </div>
  );
} //end businessProfile

const mapStateToProps = (state) => {
  console.log("this is state in business-profile", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    busProf: state.busProf,
    pickups: state.pickups,
  };
};

export default connect(mapStateToProps, {
  getBusProfData,
  getPickups,
  deleteBusProf,
})(BusinessProfile);
