import React from "react";
import { withRouter } from 'react-router-dom';

function ErrorPage(props){
	function onClickHandler(props){
		props.history.push('/');
	}


	return (
		<div>
			<h1>Error Page</h1>
			<p>잘못된 접근 입니다.</p>
			<button onClick = {onClickHandler}>메인페이지로</button>
		</div>

	)
	
}
export default withRouter(ErrorPage);