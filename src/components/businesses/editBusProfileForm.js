import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { connect } from "react-redux";

//actions from Redux
import { getBusProfData } from "../store/actions/index";

//boostrap
import Form from "react-bootstrap/Form";

//bootstrap
import Button from "react-bootstrap/Button";

const EditProfileForm = ({
  setToggle,
  togglestate,
  busProf,
  profile,
  getProfileData,
  getBusProfData,
}) => {
  // const [editProfile, setEditedProfile] = useState({
  //   address: profile["business-address"],
  //   name: profile["business-name"],
  //   phone: profile["business-phone"],
  //   username: profile["username"],
  //   id: profile["business-id"],
  // });
  const [editProfile, setEditedProfile] = useState({
    id: busProf["donor-id"],
    name: busProf["business-name"],
    phone: busProf["business-phone"],
    address: busProf["business-address"],
    username: busProf["username"],
  });
  //const [editProfile, setEditedProfile] = useState(busProf);
  console.log("This is edit profile", editProfile);
  const { push } = useHistory();

  const handleChange = (e) => {
    setEditedProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });
  };

  const exit = (e) => {
    setToggle(false);
  };

  const editBusProfile = (e) => {
    //edit profile
    e.preventDefault();
    axiosWithAuth()
      .put("donors", editProfile)
      .then((res) => {
        //setToggle(!togglestate);
        //push("/business-profile")
        //getBusProfData();
        //getData()
        //add a successfully assigned to profile message
        setTimeout(function () {
          window.history.go(-1);
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="edit_bus_prof_form">
      <Form id="edit_pickup_form" onSubmit={editBusProfile}>
        <Form.Group controlId="formBasicname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={editProfile.name}
            onChange={handleChange}
            name="name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicphone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            value={editProfile.phone}
            onChange={handleChange}
            name="phone"
          />
        </Form.Group>
        <Form.Group controlId="formBasicaddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            value={editProfile.address}
            onChange={handleChange}
            name="address"
          />
        </Form.Group>

        <Button id="edit_submit" type="submit">
          Submit
        </Button>
        <Button onClick={exit}>X</Button>
      </Form>

      {/* <form onSubmit={editBusProfile}>
        <label htmlFor="type">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={editProfile.name}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          onChange={handleChange}
          name="phone"
          value={editProfile.phone}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          onChange={handleChange}
          name="address"
          value={editProfile.address}
        />
        <button type="submit">Add Updated Profile Information</button>
      </form>
      <button onClick={exit}>X</button>
    </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state in edit business profile form", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    busProf: state.busProf,
  };
};

export default connect(mapStateToProps, { getBusProfData })(EditProfileForm);

//export default EditProfileForm;
