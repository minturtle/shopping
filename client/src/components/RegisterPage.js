import React, { useState } from "react";
import NavBar from '../utils/NavBar.js';
import RegisterAction from '../_action/register_action.js';


export default function LoginPage(props) {
	
	const [email, setEmail] = useState("");
	const [password , setPassword] = useState("");
	const [username , setUsername] = useState("");
	
	var onSubmitHandler= function(e){
		let body = {email : email, password : password, username : username};
		e.preventDefault();
		RegisterAction(body).then((res)=>{
			console.log(res);
			
		})
		
		
	}
	
	var onEmailHandler = function(e){
		setEmail(e.target.value);
	}
	var onPasswordHandler = function(e){
		setPassword(e.target.value);
	}
	var onUsernameHandler = function(e){
		setUsername(e.target.value);
	}
	
		
	return (
		<div>
			<NavBar />
			<div style = {{display : 'flex', justifyContent : 'center',
			   alignItems : 'center', width: '100%', height : '100vh',flexDirection : 'column'}}>
				<h1>Register</h1>
		<form 
			style = {{display: 'flex',flexDirection : 'column' }}>
			<label>Email</label>
			<input 
				type = "email" 
				value = {email} 
				onChange = {onEmailHandler}/>

			<label>Password</label>
			<input 
				type = "password" 
				value ={password} 
				onChange= {onPasswordHandler}/>
			<label>Username</label>
			<input 
				type = "text" 
				value ={username} 
				onChange= {onUsernameHandler}/>

			<button onClick = {onSubmitHandler}>Login</button>
		</form>
			</div>
		</div>

	)
	
	
}