import axios from "axios";

export default function RegisterAction(data){
	var req = axios.post('https://minshopping-server.run.goorm.io/members/register', data).then(res=>{return res.data});
	
	return {type : "USER_LOGIN", payload : req};
	
}