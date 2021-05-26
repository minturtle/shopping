const express = require('express');
const pw = require('../secret/passwords.js');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../models').user_info; 
const jwt = require('jsonwebtoken'); 
const { auth } = require('../middleware/auth.js');

const privateKey = pw.TOKEN_KEY;



//login form
router.get('/', (req,res)=>{
	res.send('<<login form>>');
})


//local-login 시도
router.post('/locallogin', function(req,res){
	userModel.findOne({
		where : {
			email : req.body.email
		}
	}).then((user)=>{
		if(!user) return res.status(404).send("존재하지 않은 이메일입니다.");
		
		bcrypt.compare(req.body.password,user.password, function(err, result) {
    		if(!result) return res.status(404).send("비밀번호가 틀렸습니다.");
			
			jwt.sign(String(user.email), privateKey, function(err, token){
				userModel.update({token : token}, {where : {
					id : user.id
				}}).then(()=>{
					res.cookie('x_auth', token);
					res.redirect('/');
				})
			});
			
			
		});
		
	})
	
	
})


//middlware 을 통해 req.user은 인증이 완료된 유저
router.post('/logout', auth , function(req, res){
	if(!(req.user||req.token))res.status(404).send("err");
	
	//userModel update를 통해 token을 만료 시키고 cookie를 제거함
	userModel.update({token : null},{
		where : {
			id : req.user.id
		}
	}).then(()=>{
		res.clearCookie('x_auth');
		res.redirect('/');
	})
});










module.exports = router;