//this will display a particular businesse's profile
//the business will be able to edit their profile which includes their name, phone number and address
//if the business updates any of their information the updated information will also effect the pickups they
//have in progress whether it is accepted by a volunteer or if it is on the pickup list unassigned
//the business will be able to edit or delete pickups they have created
//the businesse's profile will display the pickups they have created along with the volunteer info that has agreed to pick it up ////if a volunteer is assigned and if a volunteer is not assigned then this information is blank
//the pickups data will include ...
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";



import EditPickup from "./editPickup";

import Business from "./business";

import EditProfileForm from "./editBusProfileForm";

import { connect } from "react-redux";

//actions from Redux
import { getBusProfData, deleteBusProf } from "../store/actions/index";

//styles
import "../styles/pickups.css";

const d = require("moment");

let fakeProfile = {
  name: "",
  username: "",
  phone: "",
  address: "",
  role: "donor",
};

// ---------------------------------------------------
// Dummy Data to be ignored
//----------------------------------------------------
// let fakePickups = [
//   {
//     type: "Bread",
//     amount: "2 pounds",
//     pickupTime: "May 3, 2022",
//   },
//   {
//     type: "Fruit",
//     amount: "6 pounds",
//     pickupTime: "June 5, 2022",
//   },
//   {
//     type: "Cereal",
//     amount: "5 pounds",
//     pickupTime: "June 23, 2022",
//   },
// ];
// ---------------------------------------------------
// Dummy Data to be ignored
//----------------------------------------------------

function BusinessProfile({ getBusProfData, busProf, deleteBusProf }) {
  const [profile, setProfile] = useState(fakeProfile);
  const [pickups, setPickups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { push } = useHistory();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header
    getBusProfData();
    getData();
  }, []);

  const getData = () => {
    console.log("calling update");
    axiosWithAuth()
      .get("pickups")
      .then((res) => {
        console.log(res);
        setPickups([...res.data]);
        setTimeout(function () {
          setIsLoaded(true);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  //add pickup

  return (
    <div>
      {isLoaded === false ? (
        "loading"
      ) : (
        <>
          <h3>{busProf["business-name"]}</h3>
          <h3>{busProf["business-address"]}</h3>
          <h3>{busProf["business-phone"]}</h3>
          <h3>{busProf.username}</h3>
        </>
      )}
      {toggle ? (
        push('/edit-business-profile')
        //<EditProfileForm getProfileData={getBusProfData} profile={busProf} togglestate={toggle} setToggle={setToggle} />
      ) : null}
      <h2>Current Pickups</h2>
      {isLoaded === false ? (
        "loading"
      ) : (
        <Business
          setIsLoaded={setIsLoaded}
          update={getData}
          setAllPickups={setPickups}
          data={pickups}
        />
      )}

      <button onClick={() => push("/add-pickup")}>Add Pickup</button>
      {/* <button onClick={() => setToggle(!toggle)}>Edit Profile</button> */}
      <button onClick={() => push('/edit-business-profile')}>Edit Profile</button>

      <button
        onClick={() => {
          deleteBusProf();
          push("/logout");
        }}
      >
        Delete Profile
      </button>
    </div>
  );
} //end businessProfile

const mapStateToProps = (state) => {
  console.log("this is state in business-profile", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    busProf: state.busProf,
  };
};

export default connect(mapStateToProps, { getBusProfData, deleteBusProf })(
  BusinessProfile
);

//------------------------------------------------------
//this is for testing purposes and can be ignored
//------------------------------------------------------

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="container">
        {pickups.map((pickup) => (
          <div className="pickups">
            <div className="pickups-container">
              <h2>{pickup.type}</h2>
              <h2>{pickup.amount}</h2>
              <h2>{pickup.pickupTime}</h2>
            </div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div> */
}

//------------------------------------------------------
//this is for testing purposes and can be ignored
//------------------------------------------------------
