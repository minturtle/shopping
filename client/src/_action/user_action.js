import axios from "axios";


export function userAction(data){
	var req = axios.post('https://minshopping-server.run.goorm.io/login/locallogin', data,{
		withCredentials :true
	}).then(req=>{return req.data});
	
	return {type : "USER_LOGIN", payload : req};
	
}
