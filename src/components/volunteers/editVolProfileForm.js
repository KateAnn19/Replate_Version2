import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { connect } from "react-redux";

//bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//actions from Redux
import { getVolProfData } from "../store/actions/index";

const EditProfileForm = ({ setToggle, profile, volProf }) => {
  const [editProfile, setEditedProfile] = useState({
    name: volProf["volunteer-name"],
    phone: volProf["volunteer-phone"],
    id: volProf["volunteer-id"],
  });

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

  const editVolProfile = (e) => {
    //edit profile
    e.preventDefault();
    axiosWithAuth()
      .put("volunteers", editProfile)
      .then((res) => {
        //add a successfully assigned to profile message
        //push("/volunteer-profile");
        setTimeout(function () {
          window.history.go(-1);
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="form_container">
      <Form id="login_form" onSubmit={editVolProfile}>
        <Form.Group controlId="formBasicname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={editProfile.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicphone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            value={editProfile.phone}
            onChange={handleChange}
            name="phone"
            placeholder="Phone"
          />
        </Form.Group>

        <Button id="login_submit" type="submit">
          Submit
        </Button>
        <Button onClick={exit}>X</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state in edit volunteer profile form", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    volProf: state.volProf,
  };
};

export default connect(mapStateToProps, { getVolProfData })(EditProfileForm);
