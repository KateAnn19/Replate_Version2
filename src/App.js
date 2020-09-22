import React, { useState } from "react";
import "./components/styles/App.css";
//import Login from "./login";
import logo from "./images/replateIcon.PNG";


import LoginUser from "./components/copy-login-redux";
import Logout from "./components/logout";
import {
  Route,
  Link,
  Switch,
  useHistory,
  MemoryRouter,
} from "react-router-dom";
import ProtectedRoute from "./components/PrivateRoute";

import VolunteerRegistration from "./components/volunteers/volunteer-registration";
import BusinessRegistration from "./components/businesses/business-registration";

import BusinessProfile from "./components/businesses/business-profile";
import AddPickup from "./components/businesses/addPickup";
import EditProfileForm from "./components/businesses/editBusProfileForm";
import EditVolProfileForm from "./components/volunteers/editVolProfileForm";

import VolunteerProfile from "./components/volunteers/volunteer-profile";
import PickUpList from "./components/volunteers/pickup-list";
import EditPickup from "./components/businesses/editPickup";


import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <>
      <>
        <Navbar variant="dark" id="nav_bar">
        <img  alt=""
              src={logo}
              width="160"
              height="130"
              className="d-inline-block align-top logo"
            />
          <div id="nav_big_container">
          <Nav id="nav_container">
          <Nav.Link id="nav_link" href="https://ui-replatemarketing.vercel.app/">
            Contact Us
          </Nav.Link>
          </Nav>
          <Nav id="nav_container">
          <Nav.Link id="nav_link" href="/logout">
            Logout
          </Nav.Link>
          </Nav>
          </div>
        </Navbar>

      </>
      

      <Route exact path="/" component={LoginUser} />
      <Route
        exact
        path="/volunteer-registration"
        component={VolunteerRegistration}
      />
      <Route
        exact
        path="/business-registration"
        component={BusinessRegistration}
      />
      <ProtectedRoute
        exact
        path="/business-profile"
        component={BusinessProfile}
      />
      <ProtectedRoute
        exact
        path="/edit-business-profile"
        component={EditProfileForm}
      />
      <ProtectedRoute
        exact
        path="/edit-volunteer-profile"
        component={EditVolProfileForm}
      />
      <ProtectedRoute exact path="/add-pickup" component={AddPickup} />
      <ProtectedRoute path="/volunteer-profile" component={VolunteerProfile} />
      <ProtectedRoute path="/pickup-list" component={PickUpList} />
      <ProtectedRoute path="/logout" component={Logout} />
      <ProtectedRoute path="/editPickup" component={EditPickup} />
    </>
  );
}

export default App;

// eslint-disable-next-line no-lone-blocks
{
  /* <Container>
          <Jumbotron className="jumbotron">
            <ButtonToolbar className="custom-btn-toolbar">
              <Link to="/">
                <Button>Login</Button>
              </Link>
              <Link to="/logout">
                <Button>Logout</Button>
              </Link>
            </ButtonToolbar>
          </Jumbotron>
        </Container> */
}
