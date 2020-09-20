import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";


const EditProfileForm = ({ setToggle, profile }) => {
  const [editProfile, setEditedProfile] = useState({
    name: profile["volunteer-name"],
    phone: profile["volunteer-phone"],
    id: profile["volunteer-id"],
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
        push("/volunteer-profile");
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

export default EditProfileForm;
