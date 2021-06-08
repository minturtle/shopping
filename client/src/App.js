import React from 'react';
import LandingPage from "./components/LandingPage.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import ErrorPage from "./components/ErrorPage.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from "./hoc/auth.js";

function App() {
  return (
    <div className="App">
	  <Router>
		  <Switch>
			  <Route exact path="/"  component = {Auth(LandingPage, null)}/>
			  <Route exact path="/login"  component = {Auth(LoginPage, false)}/>
			  <Route exact path="/register"  component = {Auth(RegisterPage, false)} />
			  <Route exact path= "/error" component = {ErrorPage} />
		</Switch>
	  </Router>
    </div>
  );
}

export default App;
