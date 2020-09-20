import React, { useState } from "react";
import "./styles/App.css";
//import Login from "./login";

import Login from "./copy-login-redux";
import Logout from "./logout";
import {
  Route,
  Link,
  Switch,
  useHistory,
  MemoryRouter,
} from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";

import VolunteerRegistration from "./volunteers/volunteer-registration";
import BusinessRegistration from "./businesses/business-registration";

import BusinessProfile from "./businesses/business-profile";
import AddPickup from "./businesses/addPickup";
import EditProfileForm from "./businesses/editBusProfileForm";
import EditVolProfileForm from "./volunteers/editVolProfileForm";

import VolunteerProfile from "./volunteers/volunteer-profile";
import PickUpList from "./volunteers/pickup-list";
import EditPickup from "./businesses/editPickup";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { LinkContainer } from "react-router-bootstrap";



function App() {
  return (
    // <MemoryRouter>
      <div className="App">
        <Container>
          <Jumbotron className="jumbotron">
            <ButtonToolbar className="custom-btn-toolbar">
              <LinkContainer to="/">
                <Button>Login</Button>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Button>Logout</Button>
              </LinkContainer>
            </ButtonToolbar>
          </Jumbotron>
        </Container>

        
          <Route exact path="/" component={Login} />
          <Route
            exact path="/volunteer-registration"
            component={VolunteerRegistration}
          />
          <Route
            exact path="/business-registration"
            component={BusinessRegistration}
          />
          <Route
            exact path="/business-profile"
            component={BusinessProfile}
          />
          <Route
            exact path="/edit-business-profile"
            component={EditProfileForm}
          />
          <Route
            exact path="/edit-volunteer-profile"
            component={EditVolProfileForm}
          />
          <Route exact path="/add-pickup" component={AddPickup} />
          <ProtectedRoute
            path="/volunteer-profile"
            component={VolunteerProfile}
          />
          <Route path="/pickup-list" component={PickUpList} />
          <Route path="/logout" component={Logout} />
          <Route path="/editPickup" component={EditPickup} />
      </div>
   
  );
}

export default App;
