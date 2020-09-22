//this is a form that will allow the business to edit a pickup on their profile
//when the business creates a new pickup it will also display an edit button
//it will also display on the business profile

import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

//redux
import { connect } from "react-redux";
//actions from Redux
import { getBusProfData, updatePickup } from "../store/actions/index";

//boostrap
import Form from "react-bootstrap/Form";

//bootstrap
import Button from "react-bootstrap/Button";

const EditPickup = ({
  id,
  setIsEditing,
  info,
  data,
  setPickups,
  updatePickup,
  getData,
}) => {
  const [editPickup, setEditPickup] = useState({
    "pickup-id": info["pickup-id"],
    type: info.type,
    amount: info.amount,
    "pickup-date": info["pickup-date"],
  });
  const { push, go } = useHistory();

  console.log(editPickup)
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

  //redux
  // const update = (e) => {
  //   e.preventdefault();
  //   console.log(editPickup)
  //   updatePickup(editPickup);  // //getData();
  //   setTimeout(function () {
  //     setIsEditing(false);
  //     push('/business-profile');
  //   }, 4000);
  // };
  //redux

  const editpickup = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`pickups/${info["pickup-id"]}`, editPickup)
      .then((response) => {
        console.log("response in edit", response);
        setPickups([...data, response.data]);
        
        setTimeout(function () {
          setIsEditing(false);
          go(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addPlateForm">
      <Form id="edit_pickup_form" onSubmit={editpickup}>
        <Form.Group controlId="formBasictype">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="type"
            value={editPickup["type"]}
            onChange={handleChange}
            name="type"
          />
        </Form.Group>
        <Form.Group controlId="formBasicamount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="amount"
            value={editPickup["amount"]}
            onChange={handleChange}
            name="amount"
          />
        </Form.Group>
        <Form.Group controlId="formBasicdate">
          <Form.Label>Pickup Date: yyyy-mm-dd</Form.Label>
          <Form.Control
            type="pickup-date"
            value={editPickup["pickup-date"]}
            onChange={handleChange}
            name="pickup-date"
          />
        </Form.Group>

        <Button id="edit_submit" type="submit">
          Submit
        </Button>
        {/* <Button onClick={exit}>X</Button> */}
      </Form>

      {/* <form onSubmit={updatePickup}>
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

        <Button type="submit">Add Updated Pickup</Button>
      </form> */}
      <Button onClick={exit}>X</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state in editing", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    busProf: state.busProf,
    pickups: state.pickups,
  };
};

export default connect(mapStateToProps, { getBusProfData, updatePickup })(
  EditPickup
);
