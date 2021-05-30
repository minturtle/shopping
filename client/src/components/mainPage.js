import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import LogNavBar from '../utils/LoginNav.js';
import NLogNavBar from '../utils/notLoginnav.js';


class MainPage extends Component {
	state = {
		isLogin : false,
		isAdmin : false
	}
	
	render(){
		return (
		<div>
		  {this.state.isLogin? <LogNavBar /> : <NLogNavBar />}
			<div id = "banner">
				<Image src="holder.js/100px250" alt = "banner"fluid />
			</div>
		</div>
	)}
}


export default MainPage;