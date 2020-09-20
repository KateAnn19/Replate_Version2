import React, { useState } from "react";
import "./components/styles/App.css";
//import Login from "./login";

import Login from "./components/copy-login-redux";
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

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { LinkContainer } from "react-router-bootstrap";



function App() {
  return (
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
