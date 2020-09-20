//this will make a get request to display all the pickups
import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom"; //this can be used to easily navigate to a certain page

import { axiosWithAuth } from "../../utils/axiosWithAuth"; //this is so the request is authenticated. Look at the addPickup form you created to see how to correctly implement this on your get request

import "../styles/pickup-list.css";

//----------------------------------------------------
//this is just fake data for testing - can ignore
//----------------------------------------------------

// let fakePickups = [
//   {
//     type: "Bread",
//     amount: "1 pound",
//     pickUpTime: "May 2, 2022",
//     business: "Target",
//   },
//   {
//     type: "Eggs",
//     amount: "2 carts",
//     pickUpTime: "July 4, 2023",
//     business: "Safeway",
//   },
//   {
//     type: "Chips",
//     amount: "16 bags",
//     pickUpTime: "September 2, 2022",
//     business: "Ikea",
//   },
//   {
//     type: "Soda",
//     amount: "2 liters",
//     pickUpTime: "October 2, 2022",
//     business: "Walmart",
//   },
// ];
//----------------------------------------------------
//this is just fake data for testing - can ignore
//----------------------------------------------------

const date = require("moment"); //this is to format the date so it shows up more nicely. I can show you how it works if you are
//having trouble with it. If you look at Gordon's back-end repo docs in our Replate project he gives an example of exactly how to set this up which is how I have it here. You'll just need to wrap the date response you get back from your get request with this variable. It's a little tricky so don't worry if you have trouble. We'll go through it.

const PickUpList = () => {
  const { push } = useHistory();
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header
    axiosWithAuth()
      .get("/pickups/unassigned")
      .then((res) => {
        console.log(res);
        setPickups(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div>
      <div className="pickup-container">
        {pickups.map((pickup) => (
          <div
            id={pickup["pickup-id"]}
            key={pickup["pickup-id"]}
            className="pickups"
          >
            <h2>{pickup.type}</h2>
            <h2>{pickup["business-phone"]}</h2>
            <h2>{pickup["business-name"]}</h2>
            <h2>{pickup["business-address"]}</h2>
            <h2>{date(pickup["pickup-date"]).format("ll")}</h2>
            <button
              onClick={() =>
                //e.preventDefault()
                //console.log(pickup["pickup-id"])
                axiosWithAuth()
                  .put(`pickups/assign/${pickup["pickup-id"]}`, {
                    "volunteer-id": "assign",
                  })
                  .then((res) => {
                    //add a successfully assigned to profile message
                    push("/volunteer-profile");
                  })
                  .catch((err) => console.log(err.response))
              }
            >
              Accept
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => push("/volunteer-profile")}>
        Back to Profile
      </button>
    </div>
  );
};

export default PickUpList;
