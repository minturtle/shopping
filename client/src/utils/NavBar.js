import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

function NavBar(props){
	var state = useSelector(state=>state);
	const isLogin = state.isLogin;
	const user = state.user;
	
	function onLogOutHandler(e){
	e.preventDefault();
	axios.get("https://minshopping-server.run.goorm.io/login/logout",{withCredentials :true}).then((res)=>{
		console.log(res);
		if(res.data.success){
			props.history.push('/');
		}
	})};	
	

	var navs = null;
	if(isLogin === false){
		navs =  <Nav className="me-auto">
					<Nav.Link href="/login">Sign in</Nav.Link>
					<Nav.Link href="/register">Sign up</Nav.Link>
				  </Nav>
	}
	else{
		//logout시 token이 전송이 안되는 이슈 해결하기
		navs =  <Nav className="me-auto">
					<Nav.Link href="/">Welcome {user.username}!</Nav.Link>
					<Nav.Link href="/logout" onClick = {onLogOutHandler}>Sign out</Nav.Link>
				  </Nav>
	}


	return (
		<div>
			<Navbar expand="lg" Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/">#MinShop</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  {navs}
</Navbar.Collapse>
</Container>
</Navbar>
		</div>
	)

}

export default withRouter(NavBar);