import React from "react";
import axios from "axios";

export default function AdminPage(props){
	
	var onUploadBanner = function(e){
		e.preventDefault();
		const formData = new FormData();
		formData.append("Banner", e.target[0].files[0]);
		
		axios.post('https://minshopping-server.run.goorm.io/banner/banner-upload', formData).then(res=>{
			if(res.data.success) return alert(res.data.message);
			else return alert(res.data.message);
			
		});
		
	}
	
	return (
		<div>
			<form style ={{border : "1px solid black",
						  width : "80%",
						  margin : "0 auto",
						  padding : "o auto"
						  }} encType="multipart/form-data"
				onSubmit = {onUploadBanner}>
				<label><h2>배너 이미지 추가</h2></label>
				<div ><input type = "file" name = "Banner" /></div>
				<input type = "submit" />
			</form>
		</div>

	)
	
}
