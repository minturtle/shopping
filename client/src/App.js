import React, { Component } from "react";
import MainPage from './components/mainPage.js';
import LogNavBar from './utils/LoginNav.js';
import NLogNavBar from './utils/notLoginnav.js';

class App extends Component {
	state = {
		isLogin : false
	}
	
	render(){ return (
	<div className="App">
	  {this.state.isLogin? <LogNavBar /> : <NLogNavBar />}
		<MainPage />
	</div>
	);} 
}

export default App;
