import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { connect } from "react-redux";

//actions from Redux
import { getVolProfData} from "../store/actions/index";

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
    <div className="">
      <form onSubmit={editVolProfile}>
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
        <button type="submit">Add Updated Profile Information</button>
      </form>
      <button onClick={exit}>X</button>
    </div>
  );
};


const mapStateToProps = (state) => {
  console.log("this is state in edit volunteer profile form", state);
  return {
    isFetching: state.isFetching,
    error: state.error,
    volProf: state.busProf,
  };
};

export default connect(mapStateToProps, { getVolProfData})(
  EditProfileForm
);

