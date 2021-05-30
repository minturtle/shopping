import React, { Component } from "react";
import MainPage from './components/mainPage.js';
import AdminPage from './components/AdminPage.js';
import { Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
	state = {
		isLogin : false,
		isAdmin : false
	}
	
	render(){ return (
	<div className="App">
		<Router>
			<Route exact path="/" render={()=><MainPage/>}/>
			<Route exact path="/admin" render={()=><AdminPage />}/>
		</Router>
		
	</div>
	);} 
}

export default App;
