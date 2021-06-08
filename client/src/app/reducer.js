
export default function Reducer(state, action){

	if(state === undefined)return {isLogin : false , user : null}
	
	switch(action.type){
		case "USER_LOGIN":
			if(action.payload.success) 
				return {isLogin : true, user : action.payload.user};
			else return {isLogin :false, user : null};
			
		case "USER_AUTH":
			if(action.payload.success) return {isLogin : true, user : action.payload.user};
			else return { isLogin :false, user : null}
			
		default:
			
			return state;
	}
}