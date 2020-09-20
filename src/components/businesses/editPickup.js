//this is a form that will allow the business to edit a pickup on their profile
//when the business creates a new pickup it will also display an edit button
//it will also display on the business profile

import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const EditPickup = ({ id, setIsEditing, info, data, setPickups }) => {
  const [editPickup, setEditPickup] = useState({
    "pickup-id": info["pickup-id"],
    type: info.type,
    amount: info.amount,
    "pickup-date": info["pickup-date"],
  });
  const { push } = useHistory();
  console.log("HERE", editPickup);

  //   {
  //     "pickup-id": 13,
  //     "type": "naan",
  //     "amount": "20kg ",
  //     "pickup-date": "2020-05-30T05:00:00.000Z"
  // }

  const handleChange = (e) => {
    setEditPickup({
      ...editPickup,
      [e.target.name]: e.target.value,
    });
  };

  const exit = (e) => {
    setIsEditing(false);
  };

  const updatePickup = (e) => {
    axiosWithAuth()
      .put(`pickups/${info["pickup-id"]}`, editPickup)
      .then((response) => {
        console.log(response);
        setPickups([...data, response]);
        setTimeout(function () {
          setIsEditing(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addPlateForm">
      <form onSubmit={updatePickup}>
        <label htmlFor="type">Type</label>
        <input
          id="type"
          type="text"
          name="type"
          value={editPickup["type"]}
          onChange={handleChange}
        />

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          onChange={handleChange}
          name="amount"
          value={editPickup["amount"]}
        />

        <label htmlFor="pickup-date">Pickup Date</label>
        <input
          id="pickup-date"
          onChange={handleChange}
          type="text"
          name="pickup-date"
          placeholder="yyyy-mm-dd"
          value={editPickup["pickup-date"]}
        />

        <button type="submit">Add Updated Pickup</button>
      </form>
      <button onClick={exit}>X</button>
    </div>
  );
};

export default EditPickup;
