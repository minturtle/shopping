import React, { useState } from "react";
import NavBar from '../utils/NavBar.js';
import { userAction } from '../_action/user_action.js';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
	
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password , setPassword] = useState("");
	
	var onSubmitHandler= function(e){
		let body = {email : email, password : password};
		e.preventDefault();
		dispatch(userAction(body)).then((res)=>{
					if(res.payload.success){
						props.history.push('/');
					}
					else{
						alert(res.payload.message); //서버에서 보내주는 로그인 실패 메세지
					}
				});
		
	}
	
	var onEmailHandler = function(e){
		setEmail(e.target.value);
	}
	var onPasswordHandler = function(e){
		setPassword(e.target.value);
	}
	
		
	return (
		<div>
			<NavBar />
			<div style = {{display : 'flex', justifyContent : 'center',
			   alignItems : 'center', width: '100%', height : '100vh',flexDirection : 'column'}}>
				<h1>Login</h1>
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

			<button onClick = {onSubmitHandler}>Login</button>
		</form>
			</div>
		</div>

	)
	
	
}
export default withRouter(LoginPage)
