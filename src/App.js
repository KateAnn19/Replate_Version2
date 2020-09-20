import React, { useState } from "react";
import "./components/styles/App.css";
//import Login from "./login";

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
              <Link to="/">
                <Button>Login</Button>
              </Link>
              <Link to="/logout">
                <Button>Logout</Button>
              </Link>
            </ButtonToolbar>
          </Jumbotron>
        </Container>

        
          <Route exact path="/" component={LoginUser} />
          <Route
            exact path="/volunteer-registration"
            component={VolunteerRegistration}
          />
          <Route
            exact path="/business-registration"
            component={BusinessRegistration}
          />
          <ProtectedRoute
            exact path="/business-profile"
            component={BusinessProfile}
          />
          <ProtectedRoute
            exact path="/edit-business-profile"
            component={EditProfileForm}
          />
          <ProtectedRoute
            exact path="/edit-volunteer-profile"
            component={EditVolProfileForm}
          />
          <ProtectedRoute exact path="/add-pickup" component={AddPickup} />
          <ProtectedRoute
            path="/volunteer-profile"
            component={VolunteerProfile}
          />
          <ProtectedRoute path="/pickup-list" component={PickUpList} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/editPickup" component={EditPickup} />
      </div>
   
  );
}

export default App;
