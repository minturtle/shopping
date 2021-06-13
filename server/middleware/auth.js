const userModel = require('../models').User; 
var jwt = require('jsonwebtoken'); 
const pw = require('../secret/passwords.js');
const privateKey = pw.TOKEN_KEY;


var auth= function(req, res, next){
	var token = req.cookies.x_auth;
	if(!token){
		req.user = null;
		req.token = null;
		return next();
	}
	jwt.verify(token, privateKey, function(err, email) {
 		if(err || !email){
			req.user = null;
			req.token = null;
			return next();
		}
		userModel.findOne({where :{
			email : email,
			token : token
		}}).then(user=>{
			if(!user){
				req.user = null;
				req.token = null;
				next();
			}
			
			req.user = user;
			req.token = token;
			next();
		})
		
	});
}





module.exports = { auth };