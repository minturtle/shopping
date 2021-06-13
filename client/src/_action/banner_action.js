import axios from "axios";

export function getBanner(){
	let result = axios.get('https://minshopping-server.run.goorm.io/banner/get-banner').then(res=>{
		
		let banner = [];
		
		for(let i = 1; i <res.data.banner.length; i++){
			var uri = 'https://minshopping.s3.ap-northeast-2.amazonaws.com/' + res.data.banner[i].Key;
			banner.push(uri);
		}
		
		return banner;
		});
	
	
	return result;
}