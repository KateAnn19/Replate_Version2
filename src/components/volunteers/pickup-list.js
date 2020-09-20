// this will make a get request to display all the pickups
import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom"; //this can be used to easily navigate to a certain page

import { Button } from '@material-ui/core'; // Material UI styled button

// this is so the request is authenticated. Look at the addPickup form you created to see how to correctly implement this on your get request 
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import PickupCard from '../volunteers/PickupCard'
import "../styles/pickup-list.css";

const date = require('moment');  //this is to format the date so it shows up more nicely. I can show you how it works if you are
//having trouble with it. If you look at Gordon's back-end repo docs in our Replate project he gives an example of exactly how to set this up which is how I have it here. You'll just need to wrap the date response you get back from your get request with this variable. It's a little tricky so don't worry if you have trouble. We'll go through it. 

const PickUpList = () => {
  const [pickupList, setPickupList] = useState([])
  const source = "/pickups/unassigned"

  // GET the data that represents orders to be picked up
  useEffect(() => {
    getPickupList();
  }, []);

  const getPickupList = () => {
    axiosWithAuth()
      .get("/pickups/unassigned")
      .then((res) => {
        setPickupList(res.data)
      })
      .catch((err) => console.error(err));
  };

  const { push, goBack } = useHistory();

  // the data we want displayed is 
  // type
  // "business-phone"
  // "business-name"
  // "business-address"
  // "pickup-date" 

  // getting the data to display may be a little tricky. Remember there are two ways
  // to access an object... with dot notation and with bracket notation. 

  return (
    <section>
      <PickupCard pickupList={pickupList} />
      <Button
        variant='contained'
        color='default'
        aria-label='text default button group'
        onClick={goBack}>
        Return to Profile</Button>
    </section>
  );
};


export default PickUpList;

