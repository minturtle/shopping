import React , { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function AuthReq(){
	var req = axios.get('https://minshopping-server.run.goorm.io/login/auth', {withCredentials : true}).then((res)=> {return res.data});
	
	return {type : "USER_AUTH", payload : req};
}

function Auth(SpecifiedComponent, ShouldLogin , ShouldAdmin = false){
	//ShouldLogin  => true라면 Auth가 성공해야 이동할수 있는 페이지 , false라면 Auth가 성공하면 못가는 페이지, null이면 다 갈수 있음
	//ShouldAdmin => true 라면 res.user.isAdmin === true 여 야만 갈수 있음.
	
	
	function AuthenticateCheck(props){
		var dispatch = useDispatch();
		useEffect(()=>{
			dispatch(AuthReq()).then(res=>{
				var AuthSuccess = res.payload.success;
				
				//Auth가 성공했을때
				if(AuthSuccess){
					
					//login이 되면 안되는 페이지라면 /error로 보냄
					if(ShouldLogin === false){
						props.history.push('/error');
					}
					else{
						//admin page에 접속할려는데 admin이 아니라면 /error로 보냄
						if(ShouldAdmin && !res.payload.user.isAdmin){
							props.history.push('/error');
						}
						
					}
				}
				//Auth가 실패했을때
				else{
					if(ShouldLogin || ShouldAdmin){
						alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
						props.history.push('/login');
					}
				}
		})
		})
		
		return <SpecifiedComponent />
	}
	
	return AuthenticateCheck;
}

export default Auth;