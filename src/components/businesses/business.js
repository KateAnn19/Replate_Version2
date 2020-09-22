import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

//material ui
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";

//actions from Redux
import { deletePickup } from "../store/actions";

import EditPickup from "./editPickup";

//styles
import "../styles/pickups.css";

const date = require("moment");

function Business({ pickupdata, update, getData, deletePickup, pickups }) {
  const [picks, setPicks] = useState(pickupdata);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPickup, setPickupToEdit] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const { push, go } = useHistory();

  const editPickup = (p) => {
    setIsEditing(true);
    setPickupToEdit(p);
  };

  return (
    <div className="container">
      {loading
        ? "loading"
        : pickups === undefined
        ? "loading"
        : pickups.map((p) => (
            <div className="List" key={p["pickup-id"]}>
              <h2>{p.type}</h2>
              <h2>{p["business-address"]}</h2>
              <h2>{p.amount}</h2>
              <h2>{p["business-name"]}</h2>
              {p["volunteer-info"] &&
              typeof p["volunteer-info"] === "object" ? (
                <>
                  <h2>{p["volunteer-info"]["volunteer-name"]}</h2>
                  <h2>{p["volunteer-info"]["volunteer-phone"]}</h2>
                </>
              ) : (
                <h2>No Volunteer Assigned Currently</h2>
              )}
              <h2>{date(p["pickup-date"]).format("ll")}</h2>
              <h2>{p["business-phone"]}</h2>
              <IconButton aria-label="Edit" onClick={() => editPickup(p)}>
                <EditIcon />
              </IconButton>
              {/* <button onClick={() => editPickup(p)}>Edit</button> */}
              {/* <button
                onClick={() => {
                  deletePickup(p["pickup-id"]);
                  push("/business-profile");
                  go(0);
                }}
              >
                Delete
              </button> */}
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  deletePickup(p["pickup-id"]);
                  push("/business-profile");
                  go(0);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

      {isEditing ? (
        <EditPickup
          setPickups={setPicks}
          setIsEditing={setIsEditing}
          info={editingPickup}
          data={pickupdata}
          getData={getData}
        />
      ) : null}
    </div>
  );
} //end businessProfile

const mapStateToProps = (state) => {
  console.log("this is state in business", state);
  return {
    isFetching: state.isFetching,
    pickups: state.pickups,
    error: state.error,
  };
};

export default connect(mapStateToProps, { deletePickup })(Business);
